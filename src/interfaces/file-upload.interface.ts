import { Request } from "express";

export interface Photo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface FileUploads {
  photo: Photo[];
}

export interface RequestWithFile extends Request {
  files: FileUploads;
}
