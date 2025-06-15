import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { authenticator } from 'otplib';
import tfaConfig from 'src/shared/infrastructure/config/tfa.config';
import { UserNotFoundException } from 'src/users/application/exceptions/user-not-found.exception';
import { FindUserRepository } from 'src/users/application/ports/repositories/find-user.repository';
import { IOtpAuthenticationService } from 'src/users/application/ports/services/otp-authentication.service';
import { UpdateUserRepository } from 'src/users/application/ports/repositories/update-user.repository';

@Injectable()
export class OtpAuthenticationService implements IOtpAuthenticationService {
  constructor(
    @Inject(tfaConfig.KEY)
    private readonly tfaConfiguration: ConfigType<typeof tfaConfig>,
    private readonly findUserRepository: FindUserRepository,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}
  generateSecret(email: string): { uri: string; secret: string } {
    const secret = authenticator.generateSecret();
    const appName = this.tfaConfiguration.appName!;
    const uri = authenticator.keyuri(email, appName, secret);
    return { uri, secret };
  }

  verifyCode(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  }

  async enableTfaForUser(email: string, secret: string): Promise<void> {
    const user = await this.findUserRepository.findOne({ email });
    if (!user) throw new UserNotFoundException();

    await this.updateUserRepository.update(user.id, {
      tfaSecret: secret,
      isTfaEnabled: true,
    });
  }
}
