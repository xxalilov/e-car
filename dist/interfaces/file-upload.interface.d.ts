import { Request } from "express";
import { User } from "../modules/Users/user.interface";
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
    files: {
        [filenames: string]: [];
    };
    user: User;
}
