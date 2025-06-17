export abstract class DeleteResetPasswordTokenRepository {
  abstract remove(id: string): Promise<void>;
}
