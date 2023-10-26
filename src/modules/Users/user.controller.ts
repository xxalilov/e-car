import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { User } from "./user.interface";
import { UpdateUserDto } from "./user.dto";
import { RequestWithUser } from "../../modules/Auth/auth.interface";
import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";

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
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData: UpdateUserDto = req.body;
      console.log("BODY", req.body);
      console.log("FILE", req.file);
      if (req.file) {
          userData.photo = req.file.path
      }
      // if (req.files) {
      //   const photo: Photo[] = req.files.photo;
      //   if (photo) {
      //     userData.photo = photo[0].path;
      //   }
      // }
      const updatedUser: User = await this.userService.updateUserDetails(
        req.user.id.toString(),
        userData
      );
      res.status(200).json({ data: updatedUser, message: "updateUser" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
