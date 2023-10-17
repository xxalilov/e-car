import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import StationController from "./station.controller";
import {CreateStationDto} from "./station.dto";
import LanguageMiddleware from "../../middlewares/language.middleware";

class StationRouter implements Routes {
    public path = "/station";
    public router = Router();
    public stationController = new StationController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            authMiddleware("admin"),
            validationMiddleware(CreateStationDto, "body"),
            this.stationController.createStation.bind(this.stationController)
        );
        this.router.get(
            `${this.path}/distance`,
            authMiddleware("all"),
            LanguageMiddleware,
            this.stationController.getStationsWithDistance.bind(
                this.stationController
            )
        );
        this.router.get(
            `${this.path}`,
            authMiddleware("all"),
            this.stationController.getAllStations.bind(this.stationController)
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware("all"),
            this.stationController.deleteStation.bind(this.stationController)
        );
    }
}

export default StationRouter;
