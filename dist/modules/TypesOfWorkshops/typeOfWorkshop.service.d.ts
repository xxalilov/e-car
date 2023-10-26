import { TypeOfWorkshop } from "./typeOfWorkshop.interface";
import { CreateTypeOfWorkshopDto, UpdateTypeOfWorkshopDto } from "./typeOfWorkshop.dto";
declare class TypeOfWorkshopService {
    typeOfWorkshop: typeof import("./typeOfWorkshop.model").TypeOfWorkshopModel;
    getAllTypesOfWorkshop(lang: string): Promise<TypeOfWorkshop[]>;
    createTypeOfWorkshop(data: CreateTypeOfWorkshopDto): Promise<TypeOfWorkshop>;
    updateTypeOfWorkshop(typeOfWorkshopId: string, updateData: UpdateTypeOfWorkshopDto): Promise<TypeOfWorkshop>;
    deleteTypeOfWorkshop(typeOfWorkshopId: string): Promise<TypeOfWorkshop>;
}
export default TypeOfWorkshopService;
