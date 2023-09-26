import { Workshop } from "./workshop.interface";
import { ResultInterface } from "../../utils/pagination";
import { CreateWorkshopDto, UpdateWorkshopDto } from "./workshop.dto";
declare class WorkshopService {
    workshop: typeof import("./workshop.model").WorkshopModel;
    typeOfWorkshop: typeof import("../TypesOfWorkshops/typeOfWorkshop.model").TypeOfWorkshopModel;
    getAllWorkshops(page: number, pageSize: number): Promise<ResultInterface>;
    getAllWorkshopsByType(typeOfWorkshopId: any): Promise<Workshop[]>;
    createWorkshop(workshopData: CreateWorkshopDto): Promise<Workshop>;
    updateWorkshop(workshopData: UpdateWorkshopDto, workshopId: string): Promise<Workshop>;
    deleteWorkshop(workshopId: string): Promise<Workshop>;
}
export default WorkshopService;
