import { Admin } from "./admin.interface";
import { UpdateAdminEmail, UpdateAdminPassword } from "./admin.dto";
declare class AdminService {
    admin: typeof import("./admin.model").AdminModel;
    updateAdminEmail(userId: string, userData: UpdateAdminEmail): Promise<Admin>;
    updateAdminPassword(userId: string, userData: UpdateAdminPassword): Promise<Admin>;
}
export default AdminService;
