import { Routes } from "../../routes/route.interface";
import CarController from "./car.controller";
declare class CarRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    carController: CarController;
    constructor();
    private initializeRoutes;
}
export default CarRouter;
