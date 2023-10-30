import { Routes } from "../../routes/route.interface";
import AdminController from "./admin.controller";
declare class AdminRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    adminController: AdminController;
    constructor();
    private initializeRoutes;
}
export default AdminRouter;
