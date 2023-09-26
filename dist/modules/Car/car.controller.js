"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const car_service_1 = tslib_1.__importDefault(require("./car.service"));
class CarController {
    constructor() {
        this.carService = new car_service_1.default();
    }
    async getAllCar(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllCarsData = await this.carService.getAllCars(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllCarsData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getCarById(req, res, next) {
        try {
            const findOneCarData = await this.carService.getCarById(req.params.id);
            res.status(200).json({ data: findOneCarData, message: "findOne" });
        }
        catch (error) {
            next(error);
        }
    }
    async getUserCars(req, res, next) {
        try {
            const findUserCars = await this.carService.getUserCars(req.user.id);
            res.status(200).json({ data: findUserCars, message: "findAll" });
        }
        catch (error) {
            next(error);
        }
    }
    async createCar(req, res, next) {
        try {
            const carData = req.body;
            const userId = req.user.id;
            console.log(req.files);
            if (req.files && req.files.photo) {
                const photo = req.files.photo;
                carData.photo = photo[0].path;
            }
            const newCar = await this.carService.createCar(carData, userId);
            res.status(201).json({ data: newCar, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateCar(req, res, next) {
        try {
            const carData = req.body;
            const carId = req.params.id;
            const photo = req.files.photo;
            if (photo) {
                carData.photo = photo[0].path;
            }
            const updatedCar = await this.carService.updateCar(carData, carId);
            res.status(200).json({ data: updatedCar, message: "updated" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CarController;
//# sourceMappingURL=car.controller.js.map