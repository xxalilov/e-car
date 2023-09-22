import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";

class AuthController {
  private authService = new AuthService();

  public async sendConfirmation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const phoneNumber: number = req.body;
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
}

export default AuthController;
