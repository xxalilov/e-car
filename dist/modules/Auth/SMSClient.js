"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const HttpException_1 = require("../../exceptions/HttpException");
class SMSClient {
    constructor(apiUrl, email, password) {
        this.methods = {
            authLogin: '/auth/login',
            sendMessage: '/message/sms/send'
        };
        this.apiUrl = apiUrl;
        this.email = email;
        this.password = password;
        this.headers = {};
    }
    async request(apiPath, data, method, headers = {}) {
        const url = this.apiUrl + apiPath;
        const requestData = {
            method,
            headers,
            url,
            data
        };
        try {
            const response = await (0, axios_1.default)(requestData);
            let incomingData = { status: 'error' };
            if (apiPath === this.methods.authRefresh) {
                if (response.status === 200) {
                    incomingData.status = 'success';
                }
            }
            else {
                incomingData = response.data;
            }
            return incomingData;
        }
        catch (error) {
            console.error(error);
            throw new HttpException_1.HttpException(500, "Eskiz server error");
        }
    }
    async auth() {
        const data = {
            method: 'post',
            apiPath: this.methods.authLogin,
            data: {
                email: this.email,
                password: this.password
            }
        };
        return await this.request(data.apiPath, data.data, data.method);
    }
    async sendSMS(phoneNumber, message) {
        const authResponse = await this.auth();
        const token = authResponse.data.token;
        this.headers.Authorization = `Bearer ${token}`;
        const data = {
            method: 'post',
            headers: this.headers,
            apiPath: this.methods.sendMessage,
            data: {
                from: 4546,
                mobile_phone: phoneNumber,
                message
            }
        };
        return await this.request(data.apiPath, data.data, data.method, data.headers);
    }
}
exports.default = SMSClient;
//# sourceMappingURL=SMSClient.js.map