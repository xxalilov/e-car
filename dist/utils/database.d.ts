import { Sequelize } from "sequelize";
export declare const sequelize: Sequelize;
declare const DB: () => Promise<void>;
export declare const models: {
    Admin: typeof import("../modules/Admin/admin.model").AdminModel;
    User: typeof import("../modules/Users/user.model").UserModel;
    Car: typeof import("../modules/Car/car.model").CarModel;
    Station: typeof import("../modules/Stations/station.model").StationModel;
    TypeOfWorkshop: typeof import("../modules/TypesOfWorkshops/typeOfWorkshop.model").TypeOfWorkshopModel;
    Workshop: typeof import("../modules/Workshops/workshop.model").WorkshopModel;
    Advertising: typeof import("../modules/Advertising/advertising.model").AdvertisingModel;
    TypeOfProduct: typeof import("../modules/TypesOfProducts/typeOfProduct.model").TypeOfProductModel;
    Product: typeof import("../modules/Products/product.model").ProductModel;
    Cart: typeof import("../modules/Cart/cart.model").CartModel;
    CartItem: typeof import("../modules/CartItem/cartItem.model").CartItemModel;
    News: typeof import("../modules/News/news.model").NewsModel;
    Instruction: typeof import("../modules/Instruction/instruction.model").InstructionModel;
};
export default DB;
