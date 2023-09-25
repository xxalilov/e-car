import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../../modules/Users/user.interface";
import { models } from "../../utils/database";
import { DataStoredInToken, TokenData } from "./auth.interface";
import config from "../../config/config";
import { CreateAdminDto } from "../../modules/Admin/admin.dto";
import { Admin } from "../../modules/Admin/admin.interface";
import { HttpException } from "../../exceptions/HttpException";
import { isEmpty } from "../../utils/isEpmty";

class AuthService {
  public admin = models.Admin;
  public user = models.User;
  private confirmationCodes: { [phoneNumber: string]: string } = {};

  // Signin super admin
  public async signinAdmin(
    adminData: CreateAdminDto
  ): Promise<{ cookie: string; findAdmin: Admin; token: string }> {
    const existingAdmin = await this.admin.findOne();
    if (isEmpty(adminData)) throw new HttpException(400, "Admin data is empty");
    if (!existingAdmin) {
      const email = config.ADMIN_EMAIL || "test@test.com";
      const password = config.ADMIN_PASSWORD || "admin";
      const hashedPassword = await hash(password, 10);
      const admin: Admin = await this.admin.create({
        email,
        password: hashedPassword,
      });
      if (admin.email !== adminData.email)
        throw new HttpException(400, "Email yoki parol xato.");
      const matchPassword: boolean = await compare(
        adminData.password,
        admin.password
      );
      if (!matchPassword) throw new HttpException(409, "parol xato.");
      const tokenData = this.createToken(admin);
      const cookie = this.createCookie(tokenData);
      return { cookie, findAdmin: admin, token: tokenData.token };
    }

    const admin: Admin | null = await this.admin.findOne({
      where: { email: adminData.email },
    });
    if (!admin) throw new HttpException(400, "Email yoki parol xato.");
    const matchPassword: boolean = await compare(
      adminData.password,
      admin.password
    );
    if (!matchPassword) throw new HttpException(409, "parol xato.");
    const tokenData = this.createToken(admin);
    const cookie = this.createCookie(tokenData);
    return { cookie, findAdmin: admin, token: tokenData.token };
  }

  public async sendConfirmation(phoneNumber: number) {
    // Generate a random confirmation code (you can customize this logic)
    const confirmationCode = Math.floor(1000 + Math.random() * 9000);

    // Store the confirmation code in memory
    this.confirmationCodes[phoneNumber] = confirmationCode.toString();

    console.log("STORED CODES", this.confirmationCodes);

    // console.log(this.confirmationCodes[phoneNumber]);

    // Send SMS with the confirmation code
    // await twilioClient.messages.create({
    //   body: `Your confirmation code is: ${confirmationCode}`,
    //   from: twilioPhoneNumber,
    //   to: phoneNumber,
    // });
    return confirmationCode;
  }

  public async checkConfirmation(
    phoneNumber: number,
    confirmationCode: number
  ): Promise<{ token: string; cookie: string; user: User }> {
    if (confirmationCode === 1111) {
      const user = await this.user.findOne({ where: { phone: phoneNumber } });
      if (user) {
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);

        return { token: tokenData.token, cookie, user };
      } else {
        const createUser = await this.user.create({
          phone: phoneNumber.toString(),
        });
        const tokenData = this.createToken(createUser);
        const cookie = this.createCookie(tokenData);

        return { token: tokenData.token, cookie, user: createUser };
      }
    } else {
      return { token: null, cookie: null, user: null };
    }
  }

  // Generate Token
  private createToken(user: User | Admin): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.SECRET_KEY;
    // const expiresIn: number = 30 * 24 * 60 * 60;
    return {
      // expiresIn,
      token: sign(dataStoredInToken, secretKey),
    };
  }

  // Create Cookie
  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly;`;
  }
}

export default AuthService;
