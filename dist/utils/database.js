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
const typeOfProduct_model_1 = tslib_1.__importDefault(require("../modules/TypesOfProducts/typeOfProduct.model"));
const product_model_1 = tslib_1.__importDefault(require("../modules/Products/product.model"));
const cart_model_1 = tslib_1.__importDefault(require("../modules/Cart/cart.model"));
const cartItem_model_1 = tslib_1.__importDefault(require("../modules/CartItem/cartItem.model"));
const news_model_1 = tslib_1.__importDefault(require("../modules/News/news.model"));
const instruction_model_1 = tslib_1.__importDefault(require("../modules/Instruction/instruction.model"));
const order_model_1 = tslib_1.__importDefault(require("../modules/Order/order.model"));
const order_item_model_1 = tslib_1.__importDefault(require("../modules/Order/order.item.model"));
const offer_model_1 = tslib_1.__importDefault(require("../modules/Offer/offer.model"));
const shipping_model_1 = tslib_1.__importDefault(require("../modules/Shipping/shipping.model"));
exports.sequelize = new sequelize_1.Sequelize(config_1.default.DB_DATABASE, config_1.default.DB_USER, config_1.default.DB_PASSWORD, {
    dialect: "postgres",
    host: config_1.default.DB_HOST,
    port: parseInt(config_1.default.DB_PORT),
    logging: false,
});
const DB = async function () {
    try {
        await exports.sequelize.sync({ force: true });
        console.log("Connected to DATABASE");
    }
    catch (error) {
        console.log(error);
    }
};
exports.models = {
    Admin: (0, admin_model_1.default)(exports.sequelize),
    Offer: (0, offer_model_1.default)(exports.sequelize),
    User: (0, user_model_1.default)(exports.sequelize),
    Car: (0, car_model_1.default)(exports.sequelize),
    Station: (0, station_model_1.default)(exports.sequelize),
    TypeOfWorkshop: (0, typeOfWorkshop_model_1.default)(exports.sequelize),
    Workshop: (0, workshop_model_1.default)(exports.sequelize),
    Advertising: (0, advertising_model_1.default)(exports.sequelize),
    TypeOfProduct: (0, typeOfProduct_model_1.default)(exports.sequelize),
    Product: (0, product_model_1.default)(exports.sequelize),
    Cart: (0, cart_model_1.default)(exports.sequelize),
    CartItem: (0, cartItem_model_1.default)(exports.sequelize),
    News: (0, news_model_1.default)(exports.sequelize),
    Instruction: (0, instruction_model_1.default)(exports.sequelize),
    Order: (0, order_model_1.default)(exports.sequelize),
    OrderItem: (0, order_item_model_1.default)(exports.sequelize),
    Shipping: (0, shipping_model_1.default)(exports.sequelize),
};
exports.default = DB;
//# sourceMappingURL=database.js.map