import { Routes } from "../../routes/route.interface";
import TypeOfProductController from "./typeOfProduct.controller";
declare class TypeOfProductRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    typesOfProductController: TypeOfProductController;
    constructor();
    private initializeRoutes;
}
export default TypeOfProductRouter;
