import express from "express";
import UserRouter from "../modules/Users/user.routes";
import AuthRouter from "../modules/Auth/auth.routes";
import CarRouter from "../modules/Car/car.routes";
const router = express.Router();

router.use("/", new UserRouter().router);
router.use("/", new AuthRouter().router);
router.use("/", new CarRouter().router);

export default router;
