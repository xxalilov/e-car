import { Product } from "./product.interface";
import { ResultInterface } from "../../utils/pagination";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
declare class ProductService {
    product: typeof import("./product.model").ProductModel;
    typeOfProduct: typeof import("../TypesOfProducts/typeOfProduct.model").TypeOfProductModel;
    getAllProduct(page: number, pageSize: number, typeOfProductId: string): Promise<ResultInterface>;
    getProductById(productId: string): Promise<Product>;
    createProduct(productData: CreateProductDto): Promise<Product>;
    updateProduct(productData: UpdateProductDto, productId: string): Promise<Product>;
    deleteProduct(productId: string): Promise<Product>;
    searchProduct(page: number, pageSize: number, searchData: string): Promise<ResultInterface>;
}
export default ProductService;
