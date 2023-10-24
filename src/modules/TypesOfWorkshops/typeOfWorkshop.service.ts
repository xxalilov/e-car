import {Sequelize} from "sequelize";
import {models} from "../../utils/database";
import {TypeOfWorkshop} from "./typeOfWorkshop.interface";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {CreateTypeOfWorkshopDto, UpdateTypeOfWorkshopDto} from "./typeOfWorkshop.dto";
import {deleteFile} from "../../utils/file";

class TypeOfWorkshopService {
    public typeOfWorkshop = models.TypeOfWorkshop;

    public async getAllTypesOfWorkshop(lang: string): Promise<TypeOfWorkshop[]> {
        if (lang === "all") {
            return await this.typeOfWorkshop.findAll({
                attributes: [
                    "id",
                    "title_uz",
                    "title_ru",
                    "title_eng",
                    "photo",
                ]
            })
        }

        return await this.typeOfWorkshop.findAll({
          attributes: [
            "id",
            [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
            "photo",
          ]
        });
    }

    public async createTypeOfWorkshop(
        data: CreateTypeOfWorkshopDto
    ): Promise<TypeOfWorkshop> {
        if (!data.photo) {
            throw new HttpException(400, "Please input photo");
        }
        return  await this.typeOfWorkshop.create(data);
    }

    public async updateTypeOfWorkshop(typeOfWorkshopId: string, updateData: UpdateTypeOfWorkshopDto): Promise<TypeOfWorkshop>{
        if (isEmpty(typeOfWorkshopId))
            throw new HttpException(400, "Please input id");
        const typeOfWorkshop = await this.typeOfWorkshop.findByPk(typeOfWorkshopId);
        if (!typeOfWorkshop)
            throw new HttpException(400, "Type Of Workshop not found");
        if(updateData.photo && typeOfWorkshop.photo) deleteFile(typeOfWorkshop.photo);
        await typeOfWorkshop.update(updateData);
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
