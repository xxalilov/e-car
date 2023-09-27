import { Routes } from "../../routes/route.interface";
import ProductController from "./product.controller";
declare class ProductRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    productController: ProductController;
    constructor();
    private initializeRoutes;
}
export default ProductRouter;
