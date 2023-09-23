import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import {
  DataStoredInToken,
  RequestWithUser,
} from "../modules/Auth/auth.interface";
import { HttpException } from "../exceptions/HttpException";
import config from "../config/config";
import { models } from "../utils/database";

const authMiddleware =
  (role: string) =>
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization =
        req.cookies["Authorization"] ||
        (req.header("Authorization")
          ? req.header("Authorization")?.split("Bearer ")[1]
          : null);

      if (Authorization) {
        const secretKey: string = config.SECRET_KEY;
        const verificationResponse = verify(
          Authorization,
          secretKey
        ) as DataStoredInToken;
        const userId = verificationResponse.id;
        if (role === "all") {
          // const findAdmin = await models.Admin.findByPk(userId);
          const findUser = await models.User.findByPk(userId);

          // if (findAdmin) {
          //   req.user = findAdmin;
          //   next();
          // } else
          if (findUser) {
            req.user = findUser;
            next();
          } else {
            next(new HttpException(401, "Wrong authentication token"));
          }
        }
        // else if (role === "admin") {
        //   const findAdmin = await models.Admin.findByPk(userId);
        //   if (findAdmin) {
        //     req.user = findAdmin;
        //     next();
        //   } else {
        //     next(new HttpException(401, "Wrong authentication token"));
        //   }
        // }
        else if (role === "user") {
          const findUser = await models.User.findByPk(userId);
          if (findUser) {
            req.user = findUser;
            next();
          } else {
            next(new HttpException(401, "Wrong authentication token"));
          }
        } else {
          next(new HttpException(500, "Server error"));
        }
      } else {
        next(new HttpException(404, "Authentication token missing"));
      }
    } catch (error) {
      next(new HttpException(401, "Wrong authentication token"));
    }
  };

export default authMiddleware;
