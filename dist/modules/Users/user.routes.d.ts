import { Routes } from "../../routes/route.interface";
import UserController from "./user.controller";
declare class UserRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    userController: UserController;
    constructor();
    private initializeRoutes;
}
export default UserRouter;
