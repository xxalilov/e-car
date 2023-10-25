import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import WorkshopController from "./workshop.controller";
import {CreateWorkshopDto, UpdateWorkshopDto} from "./workshop.dto";
import LanguageMiddleware from "../../middlewares/language.middleware";

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
            authMiddleware("admin"),
            validationMiddleware(CreateWorkshopDto, "body"),
            this.workshopController.createWorkshop.bind(this.workshopController)
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware("admin"),
            validationMiddleware(UpdateWorkshopDto, "body"),
            this.workshopController.updateWorkshop.bind(this.workshopController)
        );
        this.router.get(
            `${this.path}`,
            authMiddleware("all"),
            LanguageMiddleware,
            this.workshopController.getAllWorkshops.bind(this.workshopController)
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware("all"),
            LanguageMiddleware,
            this.workshopController.getAllWorkshopsByType.bind(
                this.workshopController
            )
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware("all"),
            this.workshopController.deleteWorkshop.bind(this.workshopController)
        );
    }
}

export default WorkshopRouter;
