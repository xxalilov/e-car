import { Routes } from "../../routes/route.interface";
import StationController from "./station.controller";
declare class StationRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    stationController: StationController;
    constructor();
    private initializeRoutes;
}
export default StationRouter;
