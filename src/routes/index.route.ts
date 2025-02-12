import express from "express";
import UserRouter from "../modules/Users/user.routes";
import AuthRouter from "../modules/Auth/auth.routes";
import CarRouter from "../modules/Car/car.routes";
import StationRouter from "../modules/Stations/station.routes";
import TypeOfWorkshopRouter from "../modules/TypesOfWorkshops/typeOfWorkshop.routes";
import WorkshopRouter from "../modules/Workshops/workshop.routes";
import AdvertisingRouter from "../modules/Advertising/advertising.routes";
import TypeOfProductRouter from "../modules/TypesOfProducts/typeOfProduct.routes";
import ProductRouter from "../modules/Products/product.routes";
import CartRouter from "../modules/Cart/cart.routes";
import NewsRouter from "../modules/News/news.routes";
import InstructionRouter from "../modules/Instruction/instruction.routes";
import OrderRouter from "../modules/Order/order.routes";
import OfferRouter from "../modules/Offer/offer.routes";
import AdminRouter from "../modules/Admin/admin.routes";
import ShippingRouter from "../modules/Shipping/shipping.routes";

const router = express.Router();

router.use("/", new UserRouter().router);
router.use('/', new AdminRouter().router);
router.use("/", new AuthRouter().router);
router.use("/", new CarRouter().router);
router.use("/", new StationRouter().router);
router.use("/", new TypeOfWorkshopRouter().router);
router.use("/", new WorkshopRouter().router);
router.use("/", new AdvertisingRouter().router);
router.use("/", new TypeOfProductRouter().router);
router.use("/", new ProductRouter().router);
router.use("/", new CartRouter().router);
router.use("/", new NewsRouter().router);
router.use("/", new InstructionRouter().router);
router.use("/", new OrderRouter().router);
router.use("/", new OfferRouter().router);
router.use("/", new ShippingRouter().router)


export default router;
