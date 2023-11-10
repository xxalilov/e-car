import { Routes } from "../../routes/route.interface";
import AuthController from "./auth.controller";
declare class AuthRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    authController: AuthController;
    constructor();
    private initializeRoutes;
}
export default AuthRouter;
