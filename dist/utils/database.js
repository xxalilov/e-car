"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.sequelize = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const config_1 = tslib_1.__importDefault(require("../config/config"));
// MODELS
const admin_model_1 = tslib_1.__importDefault(require("../modules/Admin/admin.model"));
const user_model_1 = tslib_1.__importDefault(require("../modules/Users/user.model"));
const car_model_1 = tslib_1.__importDefault(require("../modules/Car/car.model"));
const station_model_1 = tslib_1.__importDefault(require("../modules/Stations/station.model"));
const typeOfWorkshop_model_1 = tslib_1.__importDefault(require("../modules/TypesOfWorkshops/typeOfWorkshop.model"));
const workshop_model_1 = tslib_1.__importDefault(require("../modules/Workshops/workshop.model"));
const advertising_model_1 = tslib_1.__importDefault(require("../modules/Advertising/advertising.model"));
exports.sequelize = new sequelize_1.Sequelize(config_1.default.DB_DATABASE, config_1.default.DB_USER, config_1.default.DB_PASSWORD, {
    dialect: "postgres",
    host: config_1.default.DB_HOST,
    port: parseInt(config_1.default.DB_PORT),
    logging: true,
});
const DB = async function () {
    try {
        await exports.sequelize.sync({ force: false });
        console.log("Connected to DATABASE");
    }
    catch (error) {
        console.log(error);
    }
};
exports.models = {
    Admin: (0, admin_model_1.default)(exports.sequelize),
    User: (0, user_model_1.default)(exports.sequelize),
    Car: (0, car_model_1.default)(exports.sequelize),
    Station: (0, station_model_1.default)(exports.sequelize),
    TypeOfWorkshop: (0, typeOfWorkshop_model_1.default)(exports.sequelize),
    Workshop: (0, workshop_model_1.default)(exports.sequelize),
    Advertising: (0, advertising_model_1.default)(exports.sequelize),
};
exports.default = DB;
//# sourceMappingURL=database.js.map