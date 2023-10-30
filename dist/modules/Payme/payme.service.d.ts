declare class PaymeService {
    user: typeof import("../Users/user.model").UserModel;
    cart: typeof import("../Cart/cart.model").CartModel;
    private auth;
    createCard(number: string, expire: string, account: string): Promise<string>;
    getVerifyCode(account: string, token: string): Promise<{
        sent: boolean;
        phone: string;
        wait: number;
    }>;
    verify(id: string, token: string, code: string): Promise<{}>;
    checkCard(userId: string, token: string): Promise<{}>;
    createReceipt(userId: string, shippingAddress: {}): Promise<{}>;
    payReceipts(userId: string, receiptId: string, token: string): Promise<{}>;
}
export default PaymeService;
