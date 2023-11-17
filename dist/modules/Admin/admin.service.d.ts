import { Admin } from "./admin.interface";
import { CreateAdmin, UpdateAdminDetails, UpdateAdminEmail, UpdateAdminPassword } from "./admin.dto";
import { ResultInterface } from "../../utils/pagination";
declare class AdminService {
    admin: typeof import("./admin.model").AdminModel;
    updateAdminDetails(id: string, updateData: UpdateAdminDetails): Promise<Admin>;
    createAdmin(adminData: CreateAdmin): Promise<Admin>;
    updateAdminEmail(userId: string, userData: UpdateAdminEmail): Promise<Admin>;
    updateAdminPassword(userId: string, userData: UpdateAdminPassword): Promise<Admin>;
    getAllAdmins(page: number, pageSize: number): Promise<ResultInterface>;
    deleteAdmin(adminId: string): Promise<Admin>;
}
export default AdminService;
