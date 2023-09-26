"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const file_1 = require("../../utils/file");
class CarService {
    constructor() {
        this.car = database_1.models.Car;
        this.user = database_1.models.User;
    }
    async getAllCars(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.car);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }
    async getUserCars(userId) {
        if ((0, isEpmty_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user)
            throw new HttpException_1.HttpException(400, "User not found");
        const cars = await this.car.findAll({ where: { userId } });
        return cars;
    }
    async getCarById(carId) {
        if ((0, isEpmty_1.isEmpty)(carId))
            throw new HttpException_1.HttpException(400, "carId is empty");
        const car = await this.car.findByPk(carId);
        if (!car)
            throw new HttpException_1.HttpException(400, "Car not found");
        return car;
    }
    async createCar(carData, userId) {
        const user = await this.user.findByPk(userId);
        if (!user)
            throw new HttpException_1.HttpException(400, "User not found");
        const car = await this.car.create(Object.assign(Object.assign({}, carData), { userId }));
        return car;
    }
    async updateCar(carData, carId) {
        const car = await this.car.findByPk(carId);
        if (!car)
            throw new HttpException_1.HttpException(400, "Car not found");
        if (carData.photo && car.photo)
            (0, file_1.deleteFile)(car.photo);
        await car.update(carData);
        return car;
    }
}
exports.default = CarService;
//# sourceMappingURL=car.service.js.map