import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import AdvertisingController from "./advertising.controller";
import { CreateAdvertisingDto } from "./advertising.dto";

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
      //   authMiddleware("user"),
      validationMiddleware(CreateAdvertisingDto, "body"),
      this.advertisingController.createAdvertising.bind(
        this.advertisingController
      )
    );
    this.router.delete(
      `${this.path}`,
      //   authMiddleware("user"),
      this.advertisingController.deleteAdvertising.bind(
        this.advertisingController
      )
    );
    this.router.get(
      `${this.path}`,
      this.advertisingController.getAllAdvertisings.bind(
        this.advertisingController
      )
    );
  }
}

export default AdvertisingRouter;
