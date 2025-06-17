import {
  Body,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ActiveUser } from 'src/shared/application/decorators/authentication/active-user.decorator';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';
import { UpdateProfilePictureCommand } from 'src/users/application/commands/update-profile-picture.command';
import { UserFacade } from 'src/users/application/user.facade';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCommand } from 'src/users/application/commands/update-user.command';
import { ApiTags } from '@nestjs/swagger';
import { CreateAddressCommand } from 'src/users/application/commands/create-address.command';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordCommand } from 'src/users/application/commands/change-password.command';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly userFacade: UserFacade) {}

  // @ApiHeaders([{ name: 'Content-Type', description: 'multipart/form-data' }])
  @UseInterceptors(FileInterceptor('imageFile'))
  @Post('/me/upload/profile-picture')
  uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.userFacade.updateProfilePicture(
      new UpdateProfilePictureCommand(file, user.sub),
    );
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch('/me/profile')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: IActiveUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userFacade.updateUser(
      new UpdateUserCommand(
        user.sub,
        updateUserDto.firstName,
        updateUserDto.lastName,
        updateUserDto.userName,
        updateUserDto.bio,
        updateUserDto.dateOfBirth
          ? new Date(updateUserDto.dateOfBirth)
          : undefined,
        file,
        updateUserDto.address
          ? new CreateAddressCommand(
              updateUserDto.address.addressLine1,
              updateUserDto.address.state,
              updateUserDto.address.city,
              updateUserDto.address.zipCode,
              updateUserDto.address.addressLine2,
            )
          : undefined,
      ),
    );
  }

  @Post('/me/change-password')
  changePassword(
    @Body() changePassword: ChangePasswordDto,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.userFacade.changePassword(
      new ChangePasswordCommand(
        user.sub,
        changePassword.oldPassword,
        changePassword.newPassword,
      ),
    );
  }
}
