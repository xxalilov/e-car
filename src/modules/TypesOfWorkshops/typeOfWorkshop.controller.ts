import { NextFunction, Request, Response } from "express";
import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";
import TypeOfWorkshopService from "./typeOfWorkshop.service";

class TypeOfWorkshopController {
  private typeOfWorkshopService = new TypeOfWorkshopService();

  public async getAllTypeOfWorkshop(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findAllTypeOfWorkshopsData =
        await this.typeOfWorkshopService.getAllTypesOfWorkshop();
      res
        .status(200)
        .json({ data: findAllTypeOfWorkshopsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async createTypeOfWorkshop(
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      if (req.files && req.files.photo) {
        const photo: Photo[] = req.files.photo;
        if (photo) {
          data.photo = photo[0].path;
        }
      }
      const newTypeOfWorkshop =
        await this.typeOfWorkshopService.createTypeOfWorkshop(data);
      res.status(201).json({ data: newTypeOfWorkshop, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteTypeOfWorkshop(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const typeOfWorkshopId = req.params.id;
      const deletedTypeOfWorkshop =
        await this.typeOfWorkshopService.deleteTypeOfWorkshop(typeOfWorkshopId);
      res.status(200).json({ data: deletedTypeOfWorkshop, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default TypeOfWorkshopController;
