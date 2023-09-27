import { Request } from "express";
import { unlink } from "fs";
import multer from "multer";

const fileStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req: Request, file, cb) => {
    cb(
      null,
      new Date().getTime().toString() +
        "-" +
        file.originalname.replace(/\s/g, "")
    );
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const deleteFile = (filePath) => {
  unlink(filePath, (err) => {
    if (!err) {
      return console.log("Deleted File");
    }
    console.log("File didn't delete");
  });
};

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});

export { upload, deleteFile };
