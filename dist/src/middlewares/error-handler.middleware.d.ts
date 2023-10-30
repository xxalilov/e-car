import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
declare const errorMiddleware: (error: HttpException, req: Request, res: Response, next: NextFunction) => void;
export default errorMiddleware;
