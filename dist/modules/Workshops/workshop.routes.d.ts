import { Routes } from "../../routes/route.interface";
import WorkshopController from "./workshop.controller";
declare class WorkshopRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    workshopController: WorkshopController;
    constructor();
    private initializeRoutes;
}
export default WorkshopRouter;
