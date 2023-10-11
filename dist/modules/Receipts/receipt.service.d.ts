declare class ReceiptService {
    user: typeof import("../Users/user.model").UserModel;
    cart: typeof import("../Cart/cart.model").CartModel;
    private auth;
    private createCard;
    private getVerifyCode;
    verify(id: string, token: string, code: string): Promise<{}>;
    addCard(userId: number, card_number: string, card_expire: string): Promise<{}>;
    verifyCode(id: string, code: string): Promise<{}>;
    checkCard(userId: string): Promise<{}>;
    createReceipt(userId: string, shippingAddress: {}): Promise<{}>;
    payReceipts(userId: string, receiptId: string): Promise<{}>;
}
export default ReceiptService;
