"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const instruction_controller_1 = tslib_1.__importDefault(require("./instruction.controller"));
class InstructionRouter {
    constructor() {
        this.path = "/instruction";
        this.router = (0, express_1.Router)();
        this.instructionController = new instruction_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.instructionController.createInstruction.bind(this.instructionController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.instructionController.updateInstruction.bind(this.instructionController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.instructionController.getAllInstructions.bind(this.instructionController));
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.default)("all"), this.instructionController.getInstructionById.bind(this.instructionController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.instructionController.deleteInstruction.bind(this.instructionController));
    }
}
exports.default = InstructionRouter;
//# sourceMappingURL=instruction.routes.js.map