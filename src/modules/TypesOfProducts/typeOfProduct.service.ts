import { models } from "../../utils/database";
import { TypeOfProduct } from "./typeOfProduct.interface";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";
import { CreateTypeOfProductDto } from "./typeOfProduct.dto";
import { deleteFile } from "../../utils/file";

class TypeOfProductService {
  public typeOfProduct = models.TypeOfProduct;

  public async getAllTypesOfProduct(): Promise<TypeOfProduct[]> {
    const typesOfProducts = await this.typeOfProduct.findAll();
    return typesOfProducts;
  }

  public async createTypeOfProduct(
    data: CreateTypeOfProductDto
  ): Promise<TypeOfProduct> {
    if (!data.photo) {
      throw new HttpException(400, "Please input photo");
    }
    const typeOfProduct = await this.typeOfProduct.create(data);
    return typeOfProduct;
  }

  public async deleteTypeOfProduct(
    typeOfProductId: string
  ): Promise<TypeOfProduct> {
    if (isEmpty(typeOfProductId))
      throw new HttpException(400, "Please input id");
    const typeOfProduct = await this.typeOfProduct.findByPk(typeOfProductId);
    if (!typeOfProduct)
      throw new HttpException(400, "Type Of Workshop not found");
    if (typeOfProduct.photo) deleteFile(typeOfProduct.photo);
    await typeOfProduct.destroy();
    return typeOfProduct;
  }
}

export default TypeOfProductService;
