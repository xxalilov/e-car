"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_routes_1 = tslib_1.__importDefault(require("../modules/Users/user.routes"));
const auth_routes_1 = tslib_1.__importDefault(require("../modules/Auth/auth.routes"));
const car_routes_1 = tslib_1.__importDefault(require("../modules/Car/car.routes"));
const station_routes_1 = tslib_1.__importDefault(require("../modules/Stations/station.routes"));
const typeOfWorkshop_routes_1 = tslib_1.__importDefault(require("../modules/TypesOfWorkshops/typeOfWorkshop.routes"));
const workshop_routes_1 = tslib_1.__importDefault(require("../modules/Workshops/workshop.routes"));
const advertising_routes_1 = tslib_1.__importDefault(require("../modules/Advertising/advertising.routes"));
const typeOfProduct_routes_1 = tslib_1.__importDefault(require("../modules/TypesOfProducts/typeOfProduct.routes"));
const product_routes_1 = tslib_1.__importDefault(require("../modules/Products/product.routes"));
const cart_routes_1 = tslib_1.__importDefault(require("../modules/Cart/cart.routes"));
const news_routes_1 = tslib_1.__importDefault(require("../modules/News/news.routes"));
const instruction_routes_1 = tslib_1.__importDefault(require("../modules/Instruction/instruction.routes"));
const order_routes_1 = tslib_1.__importDefault(require("../modules/Order/order.routes"));
const offer_routes_1 = tslib_1.__importDefault(require("../modules/Offer/offer.routes"));
const admin_routes_1 = tslib_1.__importDefault(require("../modules/Admin/admin.routes"));
const shipping_routes_1 = tslib_1.__importDefault(require("../modules/Shipping/shipping.routes"));
const router = express_1.default.Router();
router.use("/", new user_routes_1.default().router);
router.use('/', new admin_routes_1.default().router);
router.use("/", new auth_routes_1.default().router);
router.use("/", new car_routes_1.default().router);
router.use("/", new station_routes_1.default().router);
router.use("/", new typeOfWorkshop_routes_1.default().router);
router.use("/", new workshop_routes_1.default().router);
router.use("/", new advertising_routes_1.default().router);
router.use("/", new typeOfProduct_routes_1.default().router);
router.use("/", new product_routes_1.default().router);
router.use("/", new cart_routes_1.default().router);
router.use("/", new news_routes_1.default().router);
router.use("/", new instruction_routes_1.default().router);
router.use("/", new order_routes_1.default().router);
router.use("/", new offer_routes_1.default().router);
router.use("/", new shipping_routes_1.default().router);
exports.default = router;
//# sourceMappingURL=index.route.js.map