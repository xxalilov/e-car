import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import CarController from "./car.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import { upload } from "../../utils/file";

class CarRouter implements Routes {
  public path = "/car";
  public router = Router();
  public carController = new CarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware("user"),
      // validationMiddleware(CreateCarDto, "body"),
      // upload.fields([{ name: "photo", maxCount: 1 }]),
      this.carController.createCar.bind(this.carController)
    );
    this.router.get(
      `${this.path}/user`,
      authMiddleware("user"),
      this.carController.getUserCars.bind(this.carController)
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware("user"),
      // validationMiddleware(UpdateCarDto, "body"),
      // upload.fields([{ name: "photo", maxCount: 1 }]),
      this.carController.updateCar.bind(this.carController)
    );
    this.router.get(
      `${this.path}`,
      authMiddleware("admin"),
      this.carController.getAllCar.bind(this.carController)
    );
    this.router.get(
      `${this.path}/:id`,
      authMiddleware("all"),
      this.carController.getCarById.bind(this.carController)
    );

    this.router.delete(
      `${this.path}/:id`,
      authMiddleware("user"),
      this.carController.deleteCarById.bind(this.carController)
    );
  }
}

export default CarRouter;
