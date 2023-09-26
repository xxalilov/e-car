import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import AdvertisingController from "./advertising.controller";
import { CreateAdvertisingDto } from "./advertising.dto";
import { upload } from "../../utils/file";

class AdvertisingRouter implements Routes {
  public path = "/advertising";
  public router = Router();
  public advertisingController = new AdvertisingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware("admin"),
      // validationMiddleware(CreateAdvertisingDto, "body"),
      upload.fields([{ name: "photo", maxCount: 1 }]),
      this.advertisingController.createAdvertising.bind(
        this.advertisingController
      )
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware("admin"),
      this.advertisingController.deleteAdvertising.bind(
        this.advertisingController
      )
    );
    this.router.get(
      `${this.path}`,
      authMiddleware("all"),
      this.advertisingController.getAllAdvertisings.bind(
        this.advertisingController
      )
    );
  }
}

export default AdvertisingRouter;
