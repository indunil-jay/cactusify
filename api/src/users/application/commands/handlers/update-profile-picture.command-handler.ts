/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfilePictureCommand } from '../update-profile-picture.command';
import {
  MAX_SIZE,
  VALID_IMAGE_MIME_TYPES_ARRAY,
} from 'src/shared/application/constants/upload-image-rules.constant';
import { UnsupportedImageMimeTypeException } from '../../exceptions/unsupported-mime-type.exception';
import { ImageTooLargeException } from '../../exceptions/image-size-large.exception';
import { UploadService } from 'src/shared/application/ports/upload.service';
import { IUploadedFilePayload } from 'src/shared/application/interfaces/uploaded-file-payload.interface';
import { FileTypes } from 'src/shared/application/enums/file-types.enum';
import { ConfigType } from '@nestjs/config';
import awsConfig from 'src/core/config/aws.config';
import { Inject } from '@nestjs/common';
import { ProfilePicture } from 'src/users/domain/value-objects/profile-picture.vobject';
import { UpdateUserRepository } from '../../ports/repositories/update-user.repository';
import { UserUpdatedEvent } from 'src/users/domain/events/user-updated.event';
import { User } from 'src/users/domain/user';


@CommandHandler(UpdateProfilePictureCommand)
export class UpdateProfilePictureCommandHandler
  implements ICommandHandler<UpdateProfilePictureCommand>
{
  constructor(
    private readonly uploadService: UploadService,
    private readonly eventBus: EventBus,
    private readonly updateUsersRepository: UpdateUserRepository,
    @Inject(awsConfig.KEY)
    private readonly awsConfiguration: ConfigType<typeof awsConfig>,
  ) {}
  async execute({ file, userId }: UpdateProfilePictureCommand): Promise<User> {
    // check if the file type is valid image type
    if (!VALID_IMAGE_MIME_TYPES_ARRAY.includes(file.mimetype)) {
      throw new UnsupportedImageMimeTypeException(file.mimetype);
    }
    //check size is less than 2MB, if greater create custome error and throw image is too big
    if (file.size > MAX_SIZE) {
      throw new ImageTooLargeException();
    }

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
    const profilePicture = new ProfilePicture(uploaded.path);
    profilePicture.mime = uploaded.mime;
    profilePicture.name = uploaded.name;
    profilePicture.size = uploaded.size;
    profilePicture.type = uploaded.type;

    //add database entry
    const user = await this.updateUsersRepository.update(userId, {
      profilePicture,
    });

    this.eventBus.publish(new UserUpdatedEvent(user));
    return user;
  }
}
