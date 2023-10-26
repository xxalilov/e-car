import {Request, Response} from "express";

// class FileUpload {
//     public uploadFile(req: Request, res: Response): void {
//         if (!req.files || Object.keys(req.files).length === 0) {
//             res.status(400).send('No files were uploaded.');
//             return;
//         }
//
//         // @ts-ignore
//         const uploadedFile = req.files.file as any; //
//     }
// }