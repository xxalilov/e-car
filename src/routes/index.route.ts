import express from "express";
import UserRouter from "../modules/Users/user.routes";
import AuthRouter from "../modules/Auth/auth.routes";
import CarRouter from "../modules/Car/car.routes";
import StationRouter from "../modules/Stations/station.routes";
import TypeOfWorkshopRouter from "../modules/TypesOfWorkshops/typeOfWorkshop.routes";
import WorkshopRouter from "../modules/Workshops/workshop.routes";
import AdvertisingRouter from "../modules/Advertising/advertising.routes";
const router = express.Router();

router.use("/", new UserRouter().router);
router.use("/", new AuthRouter().router);
router.use("/", new CarRouter().router);
router.use("/", new StationRouter().router);
router.use("/", new TypeOfWorkshopRouter().router);
router.use("/", new WorkshopRouter().router);
router.use("/", new AdvertisingRouter().router);

export default router;
