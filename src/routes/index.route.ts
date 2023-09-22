import express from "express";
import UserRouter from "../modules/Users/user.routes";
import AuthRouter from "../modules/Auth/auth.routes";
const router = express.Router();

router.use("/", new UserRouter().router);
router.use("/", new AuthRouter().router);

export default router;
