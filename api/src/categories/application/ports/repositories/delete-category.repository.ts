export abstract class DeleteCategoryRepository {
  abstract delete(id: string): Promise<void>;
}
