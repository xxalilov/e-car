import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import AdminController from "./admin.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import {CreateAdmin, UpdateAdminEmail, UpdateAdminPassword} from "./admin.dto";
import authMiddleware from "../../middlewares/auth.middleware";

class AdminRouter implements Routes {
    public path = "/admin";
    public router = Router();
    public adminController = new AdminController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post(
            `${this.path}`,
            authMiddleware("superadmin"),
            validationMiddleware(CreateAdmin, "body"),
            this.adminController.createAdmin.bind(this.adminController)
        );

        this.router.delete(`${this.path}/:id`,
            authMiddleware("superadmin"),
            this.adminController.deleteAdminById.bind(this.adminController)
        )

        this.router.put(
            `${this.path}/email`,
            authMiddleware("admin"),
            validationMiddleware(UpdateAdminEmail, "body"),
            this.adminController.updateAdminEmail.bind(this.adminController)
        );

        this.router.put(
            `${this.path}/password`,
            authMiddleware("admin"),
            validationMiddleware(UpdateAdminPassword, "body"),
            this.adminController.updateAdminPassword.bind(this.adminController)
        );

        this.router.put(`${this.path}/:id`,
            authMiddleware("superadmin"),
            this.adminController.updateAdminDetails.bind(this.adminController)
        )

        this.router.get(
            `${this.path}`,
            authMiddleware("superadmin"),
            this.adminController.getAllAdmins.bind(this.adminController)
        )
    }
}

export default AdminRouter;
