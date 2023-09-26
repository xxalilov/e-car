import multer from "multer";
declare const deleteFile: (filePath: any) => void;
declare const upload: multer.Multer;
export { upload, deleteFile };
