import {NextFunction, Request, Response} from "express";
import {HttpException} from "../exceptions/HttpException";

export default async function (req: Request, res: Response, next: NextFunction){
    const lang = req.query.lang;
    try{
        if (!lang)  next(new HttpException(400, "Please input language"));
        if (lang !== "uz" && lang !== "ru" && lang !== "eng")
             next(new HttpException(400, "Please input correct language"));
        next();
    }catch (error) {
        next(error)
    }
}