import {Admin} from "./admin.interface";
import {models} from "../../utils/database";
import {UpdateAdminEmail, UpdateAdminPassword} from "./admin.dto";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {hash} from "bcrypt";

class AdminService {
  public admin = models.Admin;
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
    const hashedPassword = await hash(userData.password, 10);
    return await findAdmin.update({password: hashedPassword});
  }
}

export default AdminService;
