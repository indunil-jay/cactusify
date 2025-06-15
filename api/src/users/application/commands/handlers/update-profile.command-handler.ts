import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../update-user.command';
import { User } from 'src/users/domain/user';
import { UploadService } from 'src/shared/application/ports/upload.service';
import { UpdateUserRepository } from '../../ports/repositories/update-user.repository';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import awsConfig from 'src/core/config/aws.config';
import { IUploadedFilePayload } from 'src/shared/application/interfaces/uploaded-file-payload.interface';
import { FileTypes } from 'src/shared/application/enums/file-types.enum';
import { ProfilePicture } from 'src/users/domain/value-objects/profile-picture.vobject';
import { UserUpdatedEvent } from 'src/users/domain/events/user-updated.event';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly uploadService: UploadService,
    private readonly eventBus: EventBus,
    private readonly updateUsersRepository: UpdateUserRepository,
    @Inject(awsConfig.KEY)
    private readonly awsConfiguration: ConfigType<typeof awsConfig>,
  ) {}
  async execute({
    userId,
    file,
    bio,
    dateOfBirth,
    firstName,
    lastName,
    userName,
  }: UpdateUserCommand): Promise<User> {
    let profilePicture: ProfilePicture | undefined = undefined;
    if (file) {
      // //upload to the aws
      const name = await this.uploadService.uploadFile(file);

      // //create upload entity shape
      const uploaded: IUploadedFilePayload = {
        name: name,
        path: `${this.awsConfiguration.cloudFrontUrl}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      //set profile picture data
      profilePicture = new ProfilePicture(uploaded.path);
      profilePicture.mime = uploaded.mime;
      profilePicture.name = uploaded.name;
      profilePicture.size = uploaded.size;
      profilePicture.type = uploaded.type;
    }

    //add database entry
    const user = await this.updateUsersRepository.update(userId, {
      firstName,
      lastName,
      bio,
      dateOfBirth,
      userName,
      profilePicture,
    });

    this.eventBus.publish(new UserUpdatedEvent(user));
    return user;
  }
}
