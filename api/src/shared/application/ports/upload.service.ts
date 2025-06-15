export abstract class UploadService {
  abstract uploadFile(file: Express.Multer.File): Promise<string>;
}
