import {hash, compare} from "bcrypt";
import {Admin} from "./admin.interface";
import {models} from "../../utils/database";
import {CreateAdmin, UpdateAdminDetails, UpdateAdminEmail, UpdateAdminPassword} from "./admin.dto";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";


class AdminService {
    public admin = models.Admin;

    public async updateAdminDetails(id: string, updateData: UpdateAdminDetails): Promise<Admin> {
        const admin = await this.admin.findByPk(id);
        if (!admin) throw new HttpException(400, "Admin not found");
        if(updateData.password && updateData.password.length > 0) {
            updateData.password = await hash(updateData.password, 10);
        } else {
            updateData.password = admin.password;
        }
        await admin.update(updateData);
        return admin;
    }

    public async createAdmin(adminData: CreateAdmin): Promise<Admin> {
        if(isEmpty(adminData)) throw new HttpException(400, "AdminData is empty");
        adminData.password = adminData.password = await hash(adminData.password, 10);
        return await this.admin.create(adminData);
    }

    public async updateAdminEmail(
        userId: string,
        userData: UpdateAdminEmail
    ): Promise<Admin> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
        const findAdmin = await this.admin.findByPk(userId);
        if (!findAdmin) throw new HttpException(409, "User doesn't exist");
        return await findAdmin.update(userData);
    }


    public async updateAdminPassword(
        userId: string,
        userData: UpdateAdminPassword
    ): Promise<Admin> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
        const findAdmin = await this.admin.findByPk(userId);
        if (!findAdmin) throw new HttpException(409, "User doesn't exist");

        if (userData.password !== userData.reapetPassword) throw new HttpException(409, "Passwords do not match");

        const matchPassword: boolean = await compare(
            userData.currentPassword,
            findAdmin.password
        )
        if (!matchPassword) throw new HttpException(409, "Password is incorrect");
        const hashedPassword = await hash(userData.password, 10);
        return await findAdmin.update({password: hashedPassword});
    }

    public async getAllAdmins(page: number,pageSize: number): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.admin);
        return await paginationHelper.paginate(page, pageSize);
    }

    public async deleteAdmin(adminId: string): Promise<Admin> {
        if(isEmpty(adminId)) throw new HttpException(400, "Please input adminId")
        const admin = await this.admin.findByPk(adminId);
        if (!admin) throw new HttpException(400, "admin not found");
        await admin.destroy();
        return admin;
    }
}

export default AdminService;
