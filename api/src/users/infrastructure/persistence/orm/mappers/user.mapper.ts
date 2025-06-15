import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Role } from 'src/shared/application/enums/role.enum';
import { ProfilePicture } from 'src/users/domain/value-objects/profile-picture.vobject';
import { UserProfilePictureEntity } from '../entities/user-profile-picture.entity';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const user = new User(userEntity.id);
    user.email = userEntity.email;
    user.firstName = userEntity.firstName;
    user.lastName = userEntity.lastName;
    user.password = userEntity.password;
    user.dateOfBirth = userEntity.dateOfBirth;
    user.bio = userEntity.bio;
    user.userName = userEntity.userName;
    user.role = userEntity.role;
    user.googleId = userEntity.googleId;
    user.isEmailVerified = userEntity.isEmailVerified;
    user.isTfaEnabled = userEntity.isTfaEnabled;
    user.tfaSecret = userEntity.tfaSecret;

    //profile picture data
    if (userEntity.profilePicture) {
      const profilePicture = new ProfilePicture(userEntity.profilePicture.path);
      profilePicture.mime = userEntity.profilePicture.mime;
      profilePicture.name = userEntity.profilePicture.name;
      profilePicture.size = userEntity.profilePicture.size;
      profilePicture.type = userEntity.profilePicture.type;
      user.profilePicture = profilePicture;
    }

    return user;
  }
  static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.email = user.email;
    userEntity.firstName = user.firstName;
    userEntity.userName = user.userName;
    userEntity.lastName = user.lastName;
    userEntity.password = user.password;
    userEntity.dateOfBirth = user.dateOfBirth;
    userEntity.bio = user.bio;
    userEntity.role = user.role as Role;
    userEntity.googleId = user.googleId;
    userEntity.isEmailVerified = user.isEmailVerified;

    if (user.profilePicture) {
      const profilePictureEntity = new UserProfilePictureEntity();
      profilePictureEntity.mime = user.profilePicture.mime;
      profilePictureEntity.name = user.profilePicture.name;
      profilePictureEntity.path = user.profilePicture.path;
      profilePictureEntity.size = user.profilePicture.size;
      profilePictureEntity.type = user.profilePicture.type;

      userEntity.profilePicture = profilePictureEntity;
    }

    return userEntity;
  }
}
