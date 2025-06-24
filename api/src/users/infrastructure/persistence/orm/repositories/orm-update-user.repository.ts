import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserRepository } from 'src/users/application/ports/repositories/update-user.repository';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';
import { DatabaseExeception } from '../../../../../shared/infrastructure/exceptions/common.database.exception';
import { UserProfilePictureEntity } from '../entities/user-profile-picture.entity';
import { UserAddressEntity } from '../entities/user-address.entity';

@Injectable()
export class OrmUpdateUserRepository implements UpdateUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async update(
    userId: string,
    user: Partial<Omit<User, 'email' | 'role' | 'id'>>,
  ): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOneOrFail({
        where: { id: userId },
        relations: ['profilePicture'],
      });

      // Update scalar fields
      if (user.firstName !== undefined) existingUser.firstName = user.firstName;
      if (user.lastName !== undefined) existingUser.lastName = user.lastName;
      if (user.password !== undefined) existingUser.password = user.password;
      if (user.dateOfBirth !== undefined)
        existingUser.dateOfBirth = user.dateOfBirth;
      if (user.bio !== undefined) existingUser.bio = user.bio;
      if (user.userName !== undefined) existingUser.userName = user.userName;
      if (user.googleId !== undefined) existingUser.googleId = user.googleId;
      if (user.isEmailVerified !== undefined)
        existingUser.isEmailVerified = user.isEmailVerified;
      if (user.isTfaEnabled !== undefined)
        existingUser.isTfaEnabled = user.isTfaEnabled;
      if (user.tfaSecret !== undefined) existingUser.tfaSecret = user.tfaSecret;

      // Update or replace profilePicture
      if (user.profilePicture) {
        if (existingUser.profilePicture) {
          // Update existing profile picture
          existingUser.profilePicture.mime = user.profilePicture.mime;
          existingUser.profilePicture.name = user.profilePicture.name;
          existingUser.profilePicture.path = user.profilePicture.path;
          existingUser.profilePicture.size = user.profilePicture.size;
          existingUser.profilePicture.type = user.profilePicture.type;
        } else {
          // Add new profile picture
          const newPicture = new UserProfilePictureEntity();
          newPicture.mime = user.profilePicture.mime;
          newPicture.name = user.profilePicture.name;
          newPicture.path = user.profilePicture.path;
          newPicture.size = user.profilePicture.size;
          newPicture.type = user.profilePicture.type;

          existingUser.profilePicture = newPicture;
        }
      }
      //update address
      if (user.address) {
        if (existingUser.address) {
          //update address
          existingUser.address.addressLine1 = user.address.addressLine1;
          existingUser.address.addressLine2 = user.address.addressLine2;
          existingUser.address.city = user.address.city;
          existingUser.address.state = user.address.state;
          existingUser.address.zipCode = user.address.zipCode;
        } else {
          // Add new address
          const newAddress = new UserAddressEntity();
          newAddress.addressLine1 = user.address.addressLine1;
          newAddress.addressLine2 = user.address.addressLine2;
          newAddress.city = user.address.city;
          newAddress.state = user.address.state;
          newAddress.zipCode = user.address.zipCode;

          existingUser.address = newAddress;
        }
      }

      const saved = await this.usersRepository.save(existingUser);
      return UserMapper.toDomain(saved);
    } catch (error) {
      console.log(error);
      throw new DatabaseExeception(OrmUpdateUserRepository, error);
    }
  }
}
