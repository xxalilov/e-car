import multer from "multer";
declare const deleteFile: (filePath: string) => void;
declare const upload: multer.Multer;
export { upload, deleteFile };
