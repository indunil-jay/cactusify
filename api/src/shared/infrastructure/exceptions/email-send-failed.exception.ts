import { InternalServerErrorException } from '@nestjs/common';

/**
 * This exception is thrown when an email fails to send.
 */
export class EmailSendFailedException extends InternalServerErrorException {
  constructor(
    method: string, // where it failed
    originalError?: unknown,
  ) {
    super(
      'Something went wrong while sending the email. Please try again later.',
      {
        cause: originalError instanceof Error ? originalError : undefined,
      },
    );

    // Optional: log or send this to monitoring
    console.error(`[EmailError:${method}]`, originalError);
  }
}
