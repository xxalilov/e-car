"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = require("../../utils/database");
const config_1 = tslib_1.__importDefault(require("../../config/config"));
const HttpException_1 = require("../../exceptions/HttpException");
const isEpmty_1 = require("../../utils/isEpmty");
class AuthService {
    constructor() {
        this.admin = database_1.models.Admin;
        this.user = database_1.models.User;
        this.confirmationCodes = {};
    }
    // Signin super admin
    async signinAdmin(adminData) {
        const existingAdmin = await this.admin.findOne();
        if ((0, isEpmty_1.isEmpty)(adminData))
            throw new HttpException_1.HttpException(400, "Admin data is empty");
        if (!existingAdmin) {
            const email = config_1.default.ADMIN_EMAIL || "test@test.com";
            const password = config_1.default.ADMIN_PASSWORD || "admin";
            const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
            const admin = await this.admin.create({
                email,
                password: hashedPassword,
                role: "superadmin",
            });
            if (admin.email !== adminData.email)
                throw new HttpException_1.HttpException(400, "Email yoki parol xato.");
            const matchPassword = await (0, bcrypt_1.compare)(adminData.password, admin.password);
            if (!matchPassword)
                throw new HttpException_1.HttpException(409, "parol xato.");
            const tokenData = this.createToken(admin);
            const cookie = this.createCookie(tokenData);
            return { cookie, findAdmin: admin, token: tokenData.token };
        }
        const admin = await this.admin.findOne({
            where: { email: adminData.email },
        });
        if (!admin)
            throw new HttpException_1.HttpException(400, "Email yoki parol xato.");
        const matchPassword = await (0, bcrypt_1.compare)(adminData.password, admin.password);
        if (!matchPassword)
            throw new HttpException_1.HttpException(409, "parol xato.");
        const tokenData = this.createToken(admin);
        const cookie = this.createCookie(tokenData);
        return { cookie, findAdmin: admin, token: tokenData.token };
    }
    async sendConfirmation(phoneNumber) {
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
    async checkConfirmation(phoneNumber, confirmationCode) {
        if (confirmationCode === 1111) {
            const user = await this.user.findOne({ where: { phone: phoneNumber } });
            if (user) {
                const tokenData = this.createToken(user);
                const cookie = this.createCookie(tokenData);
                return { token: tokenData.token, cookie, user };
            }
            else {
                const createUser = await this.user.create({
                    phone: phoneNumber.toString(),
                });
                const tokenData = this.createToken(createUser);
                const cookie = this.createCookie(tokenData);
                return { token: tokenData.token, cookie, user: createUser };
            }
        }
        else {
            return { token: null, cookie: null, user: null };
        }
    }
    // Generate Token
    createToken(user) {
        const dataStoredInToken = { id: user.id.toString() };
        const secretKey = config_1.default.SECRET_KEY;
        // const expiresIn: number = 30 * 24 * 60 * 60;
        return {
            // expiresIn,
            token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey),
        };
    }
    // Create Cookie
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly;`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map