import { NextFunction, Request, Response } from "express";
import path from "path";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
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
        await this.typeOfWorkshopService.getAllTypesOfWorkshop(req.query.lang as string);
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
      if (req.files && Object.keys(req.files).length > 0) {
        const baseDir = path.join(__dirname, '../../../');
        const timestamp = Date.now();
        let sampleFile = req.files.photo as any;
        const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
        sampleFile.mv(uploadPath, function(err) {
          if (err) next(err);
        });
        data.photo = `uploads/images/${newFileName}`;
      }
      const newTypeOfWorkshop =
        await this.typeOfWorkshopService.createTypeOfWorkshop(data);
      res.status(201).json({ data: newTypeOfWorkshop, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async updateTypeOfWorkshop(req: RequestWithFile, res: Response, next: NextFunction) {
    try {
      const typeOfWorkshopId = req.params.id;
      const data = req.body;
      if (req.files && Object.keys(req.files).length > 0) {
        const baseDir = path.join(__dirname, '../../../');
        const timestamp = Date.now();
        let sampleFile = req.files.photo as any;
        const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
        sampleFile.mv(uploadPath, function(err) {
          if (err) next(err);
        });
        data.photo = `uploads/images/${newFileName}`;
      }
      const updatedTypeOfWorkshop = await this.typeOfWorkshopService.updateTypeOfWorkshop(typeOfWorkshopId, data);
      res.status(200).json({ data: updatedTypeOfWorkshop, message: "updated" });
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
