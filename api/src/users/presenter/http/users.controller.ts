import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ActiveUser } from 'src/shared/application/decorators/authentication/active-user.decorator';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';
import { UpdateProfilePictureCommand } from 'src/users/application/commands/update-profile-picture.command';
import { UsersFacade } from 'src/users/application/users.facade';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersFacade) {}

  // @ApiHeaders([{ name: 'Content-Type', description: 'multipart/form-data' }])
  @UseInterceptors(FileInterceptor('imageFile'))
  @Post('/me/upload/profile-picture')
  uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.usersService.updateProfilePicture(
      new UpdateProfilePictureCommand(file, user.sub),
    );
  }
}
