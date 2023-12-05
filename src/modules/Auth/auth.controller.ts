import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { CreateAdminDto } from "../../modules/Admin/admin.dto";
import { RequestWithUser } from "./auth.interface";

class AuthController {
  private authService = new AuthService();

  public async signInAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateAdminDto = req.body;
      const { cookie, findAdmin, token } = await this.authService.signinAdmin(
        userData
      );
      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json({ data: findAdmin, token, message: "signin admin" });
    } catch (error) {
      next(error);
    }
  }

  public async sendConfirmation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const phoneNumber: number = req.body.phoneNumber;
      const confirmationCode = await this.authService.sendConfirmation(
        phoneNumber
      );
      res
        .status(200)
        .json({ data: null, message: "Confirmation code sent succesfully" });
    } catch (error) {
      next(error);
    }
  }

  public async checkConfirmation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { phoneNumber, confirmationCode } = req.body;
      const { token, cookie, user } = await this.authService.checkConfirmation(
        phoneNumber,
        confirmationCode
      );
      if (token && cookie && user) {
        res.setHeader("Set-Cookie", [cookie]);
        res.status(200).json({ data: user, token, message: "signin user" });
      } else {
        res
          .status(403)
          .json({ data: null, message: "Confirmation code is incorrect" });
      }
    } catch (error) {
      next(error);
    }
  }

  public async getCurrentUser(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;
      res.status(200).json({
        message: "Sent User data",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
