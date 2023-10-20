import { TypeOfProduct } from "./typeOfProduct.interface";
import { CreateTypeOfProductDto } from "./typeOfProduct.dto";
declare class TypeOfProductService {
    typeOfProduct: typeof import("./typeOfProduct.model").TypeOfProductModel;
    getAllTypesOfProduct(lang: string): Promise<TypeOfProduct[]>;
    createTypeOfProduct(data: CreateTypeOfProductDto): Promise<TypeOfProduct>;
    deleteTypeOfProduct(typeOfProductId: string): Promise<TypeOfProduct>;
}
export default TypeOfProductService;
