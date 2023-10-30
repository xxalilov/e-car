import { Routes } from "../../routes/route.interface";
import InstructionController from "./instruction.controller";
declare class InstructionRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    instructionController: InstructionController;
    constructor();
    private initializeRoutes;
}
export default InstructionRouter;
