import {models} from "../../utils/database";
import {TypeOfProduct} from "./typeOfProduct.interface";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {CreateTypeOfProductDto, UpdateTypeOfProductDto} from "./typeOfProduct.dto";
import {deleteFile} from "../../utils/file";
import {Sequelize} from "sequelize";

class TypeOfProductService {
  public typeOfProduct = models.TypeOfProduct;

  public async getAllTypesOfProduct(lang: string): Promise<TypeOfProduct[]> {
    if(lang === "all") {
      return await this.typeOfProduct.findAll({
        attributes: [
            "id",
            "uz",
            "eng",
            "ru",
            "photo"
        ]
      })
    }
    return await this.typeOfProduct.findAll({
      attributes: [
          "id",
        [Sequelize.literal(`COALESCE("${lang}")`), 'title'],
          "photo",
      ]
    });
  }

  public async createTypeOfProduct(
    data: CreateTypeOfProductDto
  ): Promise<TypeOfProduct> {
    if (!data.photo) {
      throw new HttpException(400, "Please input photo");
    }
    return await this.typeOfProduct.create(data);
  }

  public async updateTypeOfProduct(typeOfProductId: string, updateData: UpdateTypeOfProductDto): Promise<TypeOfProduct>{
    if (isEmpty(typeOfProductId))
      throw new HttpException(400, "Please input id");
    const typeOfProduct = await this.typeOfProduct.findByPk(typeOfProductId);
    if (!typeOfProduct)
      throw new HttpException(400, "Type Of Workshop not found");
    if(updateData.photo && typeOfProduct.photo) deleteFile(typeOfProduct.photo);
    await typeOfProduct.update(updateData);
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
