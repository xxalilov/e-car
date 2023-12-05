declare class SMSClient {
    private readonly apiUrl;
    private readonly email;
    private readonly password;
    private readonly headers;
    private methods;
    constructor(apiUrl: string, email: string, password: string);
    private request;
    private auth;
    sendSMS(phoneNumber: string, message: string): Promise<any>;
}
export default SMSClient;
