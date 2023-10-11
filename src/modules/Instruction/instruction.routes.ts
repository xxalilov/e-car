import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import InstructionController from "./instruction.controller";

class InstructionRouter implements Routes {
    public path = "/instruction";
    public router = Router();
    public instructionController = new InstructionController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            authMiddleware("admin"),
            // validationMiddleware(CreateCarDto, "body"),
            this.instructionController.createInstruction.bind(this.instructionController)
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.instructionController.updateInstruction.bind(this.instructionController)
        );
        this.router.get(
            `${this.path}`,
            authMiddleware("admin"),
            this.instructionController.getAllInstructions.bind(this.instructionController)
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware("all"),
            this.instructionController.getInstructionById.bind(this.instructionController)
        );

        this.router.delete(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.instructionController.deleteInstruction.bind(this.instructionController)
        );
    }
}

export default InstructionRouter;
