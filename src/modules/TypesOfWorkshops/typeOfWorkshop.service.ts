import {Sequelize} from "sequelize";
import { models } from "../../utils/database";
import { TypeOfWorkshop } from "./typeOfWorkshop.interface";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";
import { CreateTypeOfWorkshopDto } from "./typeOfWorkshop.dto";
import { deleteFile } from "../../utils/file";

class TypeOfWorkshopService {
  public typeOfWorkshop = models.TypeOfWorkshop;

  public async getAllTypesOfWorkshop(lang: string): Promise<TypeOfWorkshop[]> {
    const typesOfWorkshops = await this.typeOfWorkshop.findAll({
      attributes: [
        "id",
        [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
        "photo",
      ]
    });
    return typesOfWorkshops;
  }

  public async createTypeOfWorkshop(
    data: CreateTypeOfWorkshopDto
  ): Promise<TypeOfWorkshop> {
    if (!data.photo) {
      throw new HttpException(400, "Please input photo");
    }
    const typeOfWorkshop = await this.typeOfWorkshop.create(data);
    return typeOfWorkshop;
  }

  public async deleteTypeOfWorkshop(
    typeOfWorkshopId: string
  ): Promise<TypeOfWorkshop> {
    if (isEmpty(typeOfWorkshopId))
      throw new HttpException(400, "Please input id");
    const typeOfWorkshop = await this.typeOfWorkshop.findByPk(typeOfWorkshopId);
    if (!typeOfWorkshop)
      throw new HttpException(400, "Type Of Workshop not found");
    if (typeOfWorkshop.photo) deleteFile(typeOfWorkshop.photo);
    await typeOfWorkshop.destroy();
    return typeOfWorkshop;
  }
}

export default TypeOfWorkshopService;
