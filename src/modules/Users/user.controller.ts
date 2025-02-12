import { NextFunction, Request, Response } from "express";
import path from 'path';
import UserService from "./user.service";
import { User } from "./user.interface";
import { UpdateUserDto } from "./user.dto";
import {RequestWithFile} from "../../interfaces/file-upload.interface";

class UserController {
  private userService = new UserService();

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    try {
      const findAllUsersData = await this.userService.getAllUsers(
        page,
        pageSize
      );
      res.status(200).json({ ...findAllUsersData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const findOneUserData: User = await this.userService.getUserById(
        req.params.id
      );
      res.status(200).json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData: UpdateUserDto = req.body;
      if (req.files && Object.keys(req.files).length > 0) {
        const baseDir = path.join(__dirname, '../../../');
        const timestamp = Date.now();
        let sampleFile = req.files.photo as any;
        const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
        sampleFile.mv(uploadPath, function(err) {
          if (err) next(err);
        });
          userData.photo = `uploads/images/${newFileName}`;
      }
      // if (req.files) {
      //   const photo: Photo[] = req.files.photo;
      //   if (photo) {
      //     userData.photo = photo[0].path;
      //   }
      // }
      const updatedUser: User = await this.userService.updateUserDetails(
        req.user.id,
        userData
      );
      res.status(200).json({ data: updatedUser, message: "updateUser" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
