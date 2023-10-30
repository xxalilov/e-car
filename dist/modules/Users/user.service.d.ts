import { ResultInterface } from "../../utils/pagination";
import { User } from "./user.interface";
import { UpdateUserDto } from "./user.dto";
declare class UserService {
    user: typeof import("./user.model").UserModel;
    getAllUsers(page: number, pageSize: number): Promise<ResultInterface>;
    getUserById(userId: string): Promise<User>;
    updateUserDetails(userId: string, userData: UpdateUserDto): Promise<User>;
}
export default UserService;
