import slugify from "slugify";
import {Op, Sequelize} from "sequelize";
import {models} from "../../utils/database";
import {Product} from "./product.interface";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {CreateProductDto, UpdateProductDto} from "./product.dto";
import {deleteFile} from "../../utils/file";


class ProductService {
    public product = models.Product;
    public typeOfProduct = models.TypeOfProduct;

    public async getAllProduct(
        page: number,
        pageSize: number,
        typeOfProductId: string,
        searchProduct: string,
        lang: string
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.product);
        if (searchProduct) {
            return await paginationHelper.paginate(page, pageSize, {
                    slug: {[Op.like]: `%${slugify(searchProduct.toLowerCase())}%`}
                },
                [
                    "id",
                    [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                    [Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                    [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                    "price",
                    "lat",
                    "long",
                    "phone",
                    "photos",
                ]);
        }
        if (typeOfProductId) {
            return await paginationHelper.paginate(page, pageSize, {
                    typeOfProductId,
                },
                [
                    "id",
                    [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                    [Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                    [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                    "price",
                    "lat",
                    "long",
                    "phone",
                    "photos",
                ]);
        } else {
            return await paginationHelper.paginate(page, pageSize, {},
                [
                    "id",
                    [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                    [Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                    [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                    "price",
                    "lat",
                    "long",
                    "phone",
                    "photos",
                ],
                [["isTop", "DESC"]]);
        }
    }

    public async getProductById(productId: string, lang: string): Promise<Product> {
        if (isEmpty(productId)) throw new HttpException(400, "productId is empty");
        const product: Product = await this.product.findByPk(productId, {
            attributes: [
                "id",
                [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "price",
                "lat",
                "long",
                "phone",
                "photos",
            ]
        });
        if (!product) throw new HttpException(400, "Product not found");
        return product;
    }

    public async createProduct(productData: CreateProductDto): Promise<Product> {
        if (isEmpty(productData))
            throw new HttpException(400, "Please input product data correctly");
        const typeOfProduct = await this.typeOfProduct.findByPk(
            productData.typeOfProductId
        );
        if (!typeOfProduct) throw new HttpException(400, "Type not found");
        const product = await this.product.create(productData);
        return product;
    }

    public async updateProduct(
        productData: UpdateProductDto,
        productId: string
    ): Promise<Product> {
        const product = await this.product.findByPk(productId);
        if (!product) throw new HttpException(400, "Product not found");
        // if (productData.photos && product.photos) deleteFile(product.photos);
        await product.update(productData);
        return product;
    }

    public async deleteProduct(productId: string): Promise<Product> {
        const product = await this.product.findByPk(productId);
        if (!product) throw new HttpException(400, "Product not found");
        // if (productData.photos && product.photos) deleteFile(product.photos);
        await product.destroy();
        return product;
    }
}

export default ProductService;
