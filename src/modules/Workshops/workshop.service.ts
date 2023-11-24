import {getDistance} from "geolib";
import {models} from "../../utils/database";
import {Workshop} from "./workshop.interface";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {CreateWorkshopDto, UpdateWorkshopDto} from "./workshop.dto";
import {Sequelize} from "sequelize";

class WorkshopService {
    public workshop = models.Workshop;
    public typeOfWorkshop = models.TypeOfWorkshop;

    public async getAllWorkshops(
        page: number,
        pageSize: number,
        lang: string
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.workshop);

        if(lang === "all") {
            return await paginationHelper.paginate(page, pageSize, {}, [
                "id",
                "title_uz",
                "title_ru",
                "title_eng",
                "address_uz",
                "address_ru",
                "address_eng",
                "description_uz",
                "description_ru",
                "description_eng",
                "phone",
                "workingTime",
                "lat",
                "long",
                "typeOfWorkshopId",
            ]);
        }

        return await paginationHelper.paginate(page, pageSize, {}, [
            "id",
            [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
            [Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
            [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
            "phone",
            "workingTime",
            "lat",
            "long",
            "typeOfWorkshopId",
        ]);
    }

    public async getAllWorkshopsByType(
        page: number,
        pageSize: number,
        typeOfWorkshopId: string,
        lang: string
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.workshop);

        if(lang === "all") {
            return await paginationHelper.paginate(page, pageSize, {
                typeOfWorkshopId,
            }, [
                "id",
                "title_uz",
                "title_ru",
                "title_eng",
                "address_uz",
                "address_ru",
                "address_eng",
                "description_uz",
                "description_ru",
                "description_eng",
                "phone",
                "workingTime",
                "lat",
                "long",
                "typeOfWorkshopId",
            ]);
        }

        return await paginationHelper.paginate(page, pageSize, {
                typeOfWorkshopId,
            },
            [
                "id",
                [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "phone",
                "workingTime",
                "lat",
                "long",
                "typeOfWorkshopId",
            ]);

        // const workshops = await this.workshop.findAll({
        //   where: { typeOfWorkshopId },
        // });
        // return workshops;
    }
    
    public async getAllWorkshopsWithDistance(lat: string, long: string, typeOfWorkshopId: string, lang: string) {
        const allWorkshops = await this.workshop.findAll({where: {typeOfWorkshopId}, attributes: [
                "id",
                [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "phone",
                "workingTime",
                "lat",
                "long",
                "typeOfWorkshopId",
            ]});
        return allWorkshops.filter((data) => {
            const distance = getDistance(
                {latitude: parseFloat(lat), longitude: parseFloat(long)},
                {
                    latitude: parseFloat(data.lat),
                    longitude: parseFloat(data.long),
                }
            );

            if (distance / 1000 <= 50) {
                return data;
            } else {
                return;
            }
        });

    }

    public async createWorkshop(
        workshopData: CreateWorkshopDto
    ): Promise<Workshop> {
        const typeOfWorkshop = await this.typeOfWorkshop.findByPk(
            workshopData.typeOfWorkshopId
        );
        if (!typeOfWorkshop) throw new HttpException(400, "Type not found");
        return await this.workshop.create(workshopData);
    }

    public async updateWorkshop(
        workshopData: UpdateWorkshopDto,
        workshopId: string
    ): Promise<Workshop> {
        if (isEmpty(workshopId)) throw new HttpException(400, "please input id");
        const workshop = await this.workshop.findByPk(workshopId);
        if (!workshop) throw new HttpException(400, "Car not found");
        await workshop.update(workshopData);
        return workshop;
    }

    public async deleteWorkshop(workshopId: string): Promise<Workshop> {
        if (isEmpty(workshopId)) throw new HttpException(400, "please input id");
        const workshop = await this.workshop.findByPk(workshopId);
        if (!workshop) throw new HttpException(400, "Car not found");
        await workshop.destroy();
        return workshop;
    }
}

export default WorkshopService;
