import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Role } from 'src/shared/enums/role.enum';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const user = new User(userEntity.id);
    user.email = userEntity.email;
    user.firstName = userEntity.firstName;
    user.lastName = userEntity.lastName;
    user.password = userEntity.password;
    user.dataOfBirth = userEntity.dateOfBirth;
    user.bio = userEntity.bio;
    user.userName = userEntity.userName;
    user.role = userEntity.role;
    user.googleId = userEntity.googleId;
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
    userEntity.dateOfBirth = user.dataOfBirth;
    userEntity.bio = user.bio;
    userEntity.role = user.role as Role;
    userEntity.googleId = user.googleId;

    return userEntity;
  }
}
