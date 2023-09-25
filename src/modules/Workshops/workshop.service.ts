import { models } from "../../utils/database";
import { Workshop } from "./workshop.interface";
import PaginationHelper, { ResultInterface } from "../../utils/pagination";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";
import { CreateWorkshopDto, UpdateWorkshopDto } from "./workshop.dto";

class WorkshopService {
  public workshop = models.Workshop;
  public typeOfWorkshop = models.TypeOfWorkshop;

  public async getAllWorkshops(
    page: number,
    pageSize: number
  ): Promise<ResultInterface> {
    const paginationHelper = new PaginationHelper(this.workshop);
    const result = await paginationHelper.paginate(page, pageSize);
    return result;
  }

  public async getAllWorkshopsByType(typeOfWorkshopId): Promise<Workshop[]> {
    const workshops = await this.workshop.findAll({
      where: { typeOfWorkshopId },
    });
    return workshops;
  }

  public async createWorkshop(
    workshopData: CreateWorkshopDto
  ): Promise<Workshop> {
    const typeOfWorkshop = await this.typeOfWorkshop.findByPk(
      workshopData.typeOfWorkshopId
    );
    if (!typeOfWorkshop) throw new HttpException(400, "Type not found");
    const workshop = await this.workshop.create(workshopData);
    return workshop;
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
