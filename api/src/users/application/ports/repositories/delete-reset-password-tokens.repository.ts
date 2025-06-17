export abstract class DeleteResetPasswordTokensRepository {
  abstract remove(id: string): Promise<void>;
}
