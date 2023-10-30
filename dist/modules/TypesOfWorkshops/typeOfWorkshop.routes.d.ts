import { Routes } from "../../routes/route.interface";
import TypeOfWorkshopController from "./typeOfWorkshop.controller";
declare class TypeOfWorkshopRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    typesOfWorkshopController: TypeOfWorkshopController;
    constructor();
    private initializeRoutes;
}
export default TypeOfWorkshopRouter;
