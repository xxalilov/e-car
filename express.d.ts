import { FileUploads } from "./src/interfaces/file-upload.interface";

declare module "express-serve-static-core" {
  interface Request {
    files: FileUploads;
  }
}
