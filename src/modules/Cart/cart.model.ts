import {
    DataTypes,
    Model,
    Optional,
    Sequelize,
} from "sequelize";
import {Cart} from "./cart.interface";
import {Product} from "../../modules/Products/product.interface";

export type CartCreationAttributes = Optional<
    Cart,
    "id" | "userId" | "totalPrice"
>;

export class CartModel
    extends Model<Cart, CartCreationAttributes>
    implements Cart {
    public id: number;
    public userId: string;
    public totalPrice: number;

    public addProduct!: Function; // Function signature for addProduct method
    public removeProduct!: Function; // Function signature for removeProduct method
    public calculateTotal!: Function; // Function signature for removeProduct method
    public getProducts!: Function; // Function signature for removeProduct method

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CartModel {
    CartModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.BIGINT,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            totalPrice: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "carts",
            sequelize,
        }
    );

    // const CartItem = sequelize.define("cartItem", {
    //   id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     allowNull: false,
    //     autoIncrement: true,
    //   },
    //   quantity: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: 1,
    //   },
    //   productId: {
    //     type: DataTypes.STRING,
    //     references: {
    //       model: ProductModel,
    //       key: "id",
    //     },
    //   },
    //   cartId: {
    //     type: DataTypes.STRING,
    //     references: {
    //       model: CartModel,
    //       key: "id",
    //     },
    //   },
    // });

    // CartModel.belongsTo(ProductModel);
    // ProductModel.hasMany(CartModel, {
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // });

    // CartModel.belongsToMany(ProductModel, {
    //   foreignKey: "cartId",
    //   as: "products",
    //   through: CartItem,
    // });
    // ProductModel.belongsToMany(CartModel, {
    //   foreignKey: "productId",
    //   as: "carts",
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    //   through: CartItem,
    // });

    CartModel.afterFind(async (cart: CartModel) => {
        await cart.calculateTotal();
    });

    CartModel.prototype.addProduct = async function (
        product: Product,
        quantity: number
    ): Promise<void> {
        await this.addProducts(product, {through: {quantity}});
        await this.calculateTotal();
    };

    CartModel.prototype.removeProduct = async function (
        product: Product
    ): Promise<void> {
        await this.removeProducts(product);
        await this.calculateTotal();
    };

    CartModel.prototype.calculateTotal = async function (): Promise<void> {
        const products = await this.getProducts();
        const totalPrice = products.reduce(
            (sum, product) => sum + product.price * product.CartItemModel.quantity,
            0
        );
        await this.update({totalPrice});
    };

    return CartModel;
}
