import { Admin } from "./admin.interface";
import { models } from "../../utils/database";
import { UpdateAdminEmail, UpdateAdminPassword } from "./admin.dto";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";
import { hash } from "bcrypt";

class AdminService {
  public admin = models.Admin;
  public async updateAdminEmail(
    userId: string,
    userData: UpdateAdminEmail
  ): Promise<Admin> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
    const findAdmin = await this.admin.findByPk(userId);
    if (!findAdmin) throw new HttpException(409, "User doesn't exist");
    const updatedData = await findAdmin.update(userData);
    return updatedData;
  }

  public async updateAdminPassword(
    userId: string,
    userData: UpdateAdminPassword
  ): Promise<Admin> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
    const findAdmin = await this.admin.findByPk(userId);
    if (!findAdmin) throw new HttpException(409, "User doesn't exist");
    const hashedPassword = await hash(userData.password, 10);
    const updatedData = await findAdmin.update({ password: hashedPassword });
    return updatedData;
  }
}

export default AdminService;
