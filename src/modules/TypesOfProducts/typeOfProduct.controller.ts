import { NextFunction, Request, Response } from "express";
import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";
import TypeOfProductService from "./typeOfProduct.service";

class TypeOfProductController {
  private typeOfProductService = new TypeOfProductService();

  public async getAllTypeOfProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const lang = req.query.lang.toString();
      const findAllTypeOfProductsData =
        await this.typeOfProductService.getAllTypesOfProduct(lang);
      res
        .status(200)
        .json({ data: findAllTypeOfProductsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async createTypeOfProduct(
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
      const newTypeOfProduct =
        await this.typeOfProductService.createTypeOfProduct(data);
      res.status(201).json({ data: newTypeOfProduct, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async updateTypeOfProduct(req: RequestWithFile, res: Response, next: NextFunction) {
    try {
      const typeOfProductId = req.params.id;
      const data = req.body;
      if (req.files && req.files.photo) {
        const photo: Photo[] = req.files.photo;
        if (photo) {
          data.photo = photo[0].path;
        }
      }
      const updatedTypeOfProduct = await this.typeOfProductService.updateTypeOfProduct(typeOfProductId, data);
      res.status(200).json({ data: updatedTypeOfProduct, message: "updated" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteTypeOfProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const typeOfProductId = req.params.id;
      const deletedTypeOfProduct =
        await this.typeOfProductService.deleteTypeOfProduct(typeOfProductId);
      res.status(200).json({ data: deletedTypeOfProduct, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default TypeOfProductController;
