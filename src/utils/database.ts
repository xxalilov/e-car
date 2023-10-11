import { Sequelize } from "sequelize";
import config from "../config/config";

// MODELS
import AdminMode from "../modules/Admin/admin.model";
import UserModel from "../modules/Users/user.model";
import CarModel from "../modules/Car/car.model";
import StationModel from "../modules/Stations/station.model";
import TypeOfWorkshopModel from "../modules/TypesOfWorkshops/typeOfWorkshop.model";
import WorkshopModel from "../modules/Workshops/workshop.model";
import AdvertisingModel from "../modules/Advertising/advertising.model";
import TypeOfProductModel from "../modules/TypesOfProducts/typeOfProduct.model";
import ProductModel from "../modules/Products/product.model";
import CartModel from "../modules/Cart/cart.model";
import CartItemModel from "../modules/CartItem/cartItem.model";
import NewsModel from "../modules/News/news.model";
import InstructionModel from "../modules/Instruction/instruction.model";

export const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: "postgres",
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT),
    logging: true,
  }
);

const DB = async function () {
  try {
    await sequelize.sync({ force: false });
    console.log("Connected to DATABASE");
  } catch (error) {
    console.log(error);
  }
};

export const models = {
  Admin: AdminMode(sequelize),
  User: UserModel(sequelize),
  Car: CarModel(sequelize),
  Station: StationModel(sequelize),
  TypeOfWorkshop: TypeOfWorkshopModel(sequelize),
  Workshop: WorkshopModel(sequelize),
  Advertising: AdvertisingModel(sequelize),
  TypeOfProduct: TypeOfProductModel(sequelize),
  Product: ProductModel(sequelize),
  Cart: CartModel(sequelize),
  CartItem: CartItemModel(sequelize),
  News: NewsModel(sequelize),
  Instruction: InstructionModel(sequelize)
};

export default DB;
