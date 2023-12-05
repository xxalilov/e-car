import axios, { AxiosRequestConfig } from 'axios';
import {HttpException} from "../../exceptions/HttpException";

class SMSClient {
    private readonly apiUrl: string;
    private readonly email: string;
    private readonly password: string;
    private readonly headers: Record<string, string>;

    private methods: Record<string, string> = {
        authLogin: '/auth/login',
        sendMessage: '/message/sms/send'
    };

    constructor(apiUrl: string, email: string, password: string) {
        this.apiUrl = apiUrl
        this.email = email;
        this.password = password;
        this.headers = {};
    }

    private async request(apiPath: string, data: any | null, method: string, headers: Record<string, string> = {}): Promise<any> {
        const url = this.apiUrl + apiPath;
        const requestData: AxiosRequestConfig = {
            method,
            headers,
            url,
            data
        };

        try {
            const response = await axios(requestData);
            let incomingData = { status: 'error' };

            if (apiPath === this.methods.authRefresh) {
                if (response.status === 200) {
                    incomingData.status = 'success';
                }
            } else {
                incomingData = response.data;
            }
            return incomingData;
        } catch (error) {
            console.error(error);
            throw new HttpException(500, "Eskiz server error");
        }
    }

    private async auth(): Promise<any> {
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

    public async sendSMS(phoneNumber: string, message: string): Promise<any> {
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

export default SMSClient;