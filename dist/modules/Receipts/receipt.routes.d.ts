import { Routes } from "../../routes/route.interface";
import ReceiptController from "./receipt.controller";
declare class ReceiptRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    receiptController: ReceiptController;
    constructor();
    private initializeRoutes;
}
export default ReceiptRouter;
