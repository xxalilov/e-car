import { User } from "../../modules/Users/user.interface";
import { CreateAdminDto } from "../../modules/Admin/admin.dto";
import { Admin } from "../../modules/Admin/admin.interface";
declare class AuthService {
    admin: typeof import("../Admin/admin.model").AdminModel;
    user: typeof import("../Users/user.model").UserModel;
    private confirmationCodes;
    signinAdmin(adminData: CreateAdminDto): Promise<{
        cookie: string;
        findAdmin: Admin;
        token: string;
    }>;
    sendConfirmation(phoneNumber: number): Promise<number>;
    checkConfirmation(phoneNumber: number, confirmationCode: number): Promise<{
        token: string;
        cookie: string;
        user: User;
    }>;
    private createToken;
    private createCookie;
}
export default AuthService;
