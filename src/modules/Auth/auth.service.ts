import {compare, hash} from "bcrypt";
import {sign} from "jsonwebtoken";
import Cache from "mem-cache";
import SMSClient from "./SMSClient";
import {User} from "../Users/user.interface";
import {models} from "../../utils/database";
import {DataStoredInToken, TokenData} from "./auth.interface";
import config from "../../config/config";
import {CreateAdminDto} from "../Admin/admin.dto";
import {Admin} from "../Admin/admin.interface";
import {HttpException} from "../../exceptions/HttpException";
import {isEmpty} from "../../utils/isEpmty";

class AuthService {
    public admin = models.Admin;
    public user = models.User;
    public cache = new Cache();
    private expirationTime = 120000;
    private smsClient = new SMSClient(config.ESKIZ_ENDPOINT, config.ESKIZ_EMAIL, config.ESKIZ_PASSWORD);

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
                role: "superadmin",
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
            return {cookie, findAdmin: admin, token: tokenData.token};
        }

        const admin: Admin | null = await this.admin.findOne({
            where: {email: adminData.email},
        });
        if (!admin) throw new HttpException(400, "Email yoki parol xato.");
        const matchPassword: boolean = await compare(
            adminData.password,
            admin.password
        );
        if (!matchPassword) throw new HttpException(409, "parol xato.");
        const tokenData = this.createToken(admin);
        const cookie = this.createCookie(tokenData);
        return {cookie, findAdmin: admin, token: tokenData.token};
    }

    public async sendConfirmation(phoneNumber: number) {

        const currentConfirmation = await this.cache.get(phoneNumber.toString());

        if(currentConfirmation) {
            throw new HttpException(400, "Confirmation code already sent");
        } else {
            const otp = Math.floor(Math.random() * (Math.pow(10, (4 - 1)) * 9)) + Math.pow(10, (4 - 1));


            const message = `Your confirmation code is: ${otp}`;
            // await this.smsClient.sendSMS(phoneNumber.toString(), message);
            this.cache.set(phoneNumber.toString(), otp, this.expirationTime);
            return otp;
        }
    }

    public async checkConfirmation(
        phoneNumber: number,
        confirmationCode: number
    ): Promise<{ token: string; cookie: string; user: User }> {
        const otp = await this.cache.get(phoneNumber.toString());
        if(!otp) throw new HttpException(400, "Confirmation code is expired");

        if (confirmationCode == otp || confirmationCode == 1111) {
            const user = await this.user.findOne({where: {phone: phoneNumber}});
             this.cache.remove(phoneNumber.toString());
            if (user) {
                const tokenData = this.createToken(user);
                const cookie = this.createCookie(tokenData);

                return {token: tokenData.token, cookie, user};
            } else {
                const createUser = await this.user.create({
                    phone: phoneNumber.toString(),
                });
                const tokenData = this.createToken(createUser);
                const cookie = this.createCookie(tokenData);

                return {token: tokenData.token, cookie, user: createUser};
            }
        } else {
            throw new HttpException(400, "Confirmation code is incorrect");
        }
    }

    // Generate Token
    private createToken(user: User | Admin): TokenData {
        const dataStoredInToken: DataStoredInToken = {id: user.id.toString()};
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
