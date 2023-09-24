import express from "express";
import UserRouter from "../modules/Users/user.routes";
import AuthRouter from "../modules/Auth/auth.routes";
import CarRouter from "../modules/Car/car.routes";
import StationRouter from "../modules/Stations/station.routes";
const router = express.Router();

router.use("/", new UserRouter().router);
router.use("/", new AuthRouter().router);
router.use("/", new CarRouter().router);
router.use("/", new StationRouter().router);

export default router;
