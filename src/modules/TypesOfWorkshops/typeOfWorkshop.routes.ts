import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import TypeOfWorkshopController from "./typeOfWorkshop.controller";
import {CreateTypeOfWorkshopDto} from "./typeOfWorkshop.dto";
import {upload} from "../../utils/file";
import LanguageMiddleware from "../../middlewares/language.middleware";

class TypeOfWorkshopRouter implements Routes {
    public path = "/types-of-workshops";
    public router = Router();
    public typesOfWorkshopController = new TypeOfWorkshopController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            authMiddleware("admin"),
            // validationMiddleware(CreateTypeOfWorkshopDto, "body"),
            upload.fields([{name: "photo", maxCount: 1}]),
            this.typesOfWorkshopController.createTypeOfWorkshop.bind(
                this.typesOfWorkshopController
            )
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.typesOfWorkshopController.deleteTypeOfWorkshop.bind(
                this.typesOfWorkshopController
            )
        );
        this.router.get(
            `${this.path}`,
            authMiddleware("all"),
            LanguageMiddleware,
            this.typesOfWorkshopController.getAllTypeOfWorkshop.bind(
                this.typesOfWorkshopController
            )
        );
    }
}

export default TypeOfWorkshopRouter;
