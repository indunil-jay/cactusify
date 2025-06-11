import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TfaGenerateCommand } from '../tfa-generate.command';
import { IOtpAuthenticationService } from '../../ports/otp-authentication.service';

@CommandHandler(TfaGenerateCommand)
export class TfaGenerateCommandHandler
  implements ICommandHandler<TfaGenerateCommand>
{
  constructor(
    private readonly otpAuthenticationService: IOtpAuthenticationService,
  ) {}
  async execute({ email }: TfaGenerateCommand): Promise<string> {
    const { secret, uri } = this.otpAuthenticationService.generateSecret(email);
    await this.otpAuthenticationService.enableTfaForUser(email, secret);
    return uri;
  }
}
