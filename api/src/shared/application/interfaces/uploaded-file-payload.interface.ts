import { FileTypes } from "../enums/file-types.enum";

export interface IUploadedFilePayload {
  name: string;
  path: string;
  type: FileTypes;
  mime: string;
  size: number;
}
