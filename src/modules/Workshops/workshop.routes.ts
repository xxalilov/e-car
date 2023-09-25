import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import WorkshopController from "./workshop.controller";
import { CreateWorkshopDto, UpdateWorkshopDto } from "./workshop.dto";

class WorkshopRouter implements Routes {
  public path = "/workshop";
  public router = Router();
  public workshopController = new WorkshopController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      //   authMiddleware("user"),
      validationMiddleware(CreateWorkshopDto, "body"),
      this.workshopController.createWorkshop.bind(this.workshopController)
    );
    this.router.put(
      `${this.path}`,
      //   authMiddleware("user"),
      validationMiddleware(UpdateWorkshopDto, "body"),
      this.workshopController.updateWorkshop.bind(this.workshopController)
    );
    this.router.get(
      `${this.path}`,
      this.workshopController.getAllWorkshops.bind(this.workshopController)
    );
    this.router.delete(
      `${this.path}/:id`,
      this.workshopController.deleteWorkshop.bind(this.workshopController)
    );
  }
}

export default WorkshopRouter;
