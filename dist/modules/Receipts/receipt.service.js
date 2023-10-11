"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = tslib_1.__importDefault(require("../../config/config"));
const database_1 = require("../../utils/database");
const HttpException_1 = require("../../exceptions/HttpException");
class ReceiptService {
    constructor() {
        this.user = database_1.models.User;
        this.cart = database_1.models.Cart;
        this.auth = {
            headers: {
                "X-Auth": `${config_1.default.PAYME_ID}:${config_1.default.PAYME_PASSWORD}`,
            },
        };
    }
    async createCard(number, expire, account) {
        const data = {
            id: account,
            method: "cards.create",
            params: {
                card: {
                    number,
                    expire,
                },
                save: true,
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        if (response.status === 200) {
            if (response.data.result.card.token) {
                return response.data.result.card.token;
            }
            else {
                throw new HttpException_1.HttpException(400, "Something went wrong");
            }
        }
        else {
            throw new HttpException_1.HttpException(400, "Something went wrong");
        }
    }
    async getVerifyCode(account, token) {
        const user = await this.user.findByPk(account);
        const data = {
            id: account,
            method: "cards.get_verify_code",
            params: {
                token,
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        if (response.status === 200) {
            await (user === null || user === void 0 ? void 0 : user.update({ card: token }));
            return response.data;
        }
        else {
            throw new HttpException_1.HttpException(400, "Something went wrong");
        }
    }
    async verify(id, token, code) {
        const data = {
            id: parseInt(id),
            method: "cards.verify",
            params: {
                token,
                code,
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        console.log(response.data);
        if (response.status === 200) {
            const user = await this.user.findByPk(id);
            if (user) {
                const responseData = await user.update({ card: response.data.result.card.token });
                return response.data;
            }
        }
        else {
            throw new HttpException_1.HttpException(400, "Something went wrong");
        }
    }
    // public async payReceipt(): Promise<void> {}
    async addCard(userId, card_number, card_expire) {
        const cardToken = await this.createCard(card_number, card_expire, userId);
        return await this.getVerifyCode(userId, cardToken);
    }
    async verifyCode(id, code) {
        const user = await this.user.findByPk(id);
        if (user.card) {
            const token = user.card;
            return await this.verify(id, token, code);
        }
        else {
            throw new HttpException_1.HttpException(500, "Something went wrong");
        }
        ;
    }
    async checkCard(userId) {
        const user = await this.user.findByPk(userId);
        if (user.card) {
            const data = {
                id: parseInt(userId),
                method: "cards.check",
                params: {
                    token: user.card,
                },
            };
            const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        }
        return {};
    }
    async createReceipt(userId, shippingAddress) {
        const userCard = await this.cart.findOne({ where: { userId } });
        const data = {
            id: parseInt(userId),
            method: "receipts.create",
            params: {
                amount: 500000,
                account: {
                    order_id: "test",
                },
                detail: {
                    receipt_type: 0,
                    shipping: {
                        title: "Доставка до ттз-4 28/23",
                        price: 500000,
                    },
                    items: [
                        {
                            discount: 10000,
                            title: "Помидоры",
                            price: 505000,
                            count: 2,
                            code: "00702001001000001",
                            units: 241092,
                            vat_percent: 15,
                            package_code: "123456",
                        },
                    ],
                },
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        console.log(response.data);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    }
    async payReceipts(userId, receiptId) {
        const user = await this.user.findByPk(userId);
        const data = {
            id: parseInt(userId),
            method: "receipts.pay",
            params: {
                id: receiptId,
                token: user.card,
                payer: {
                    phone: user.phone,
                }
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        console.log(response.data);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    }
}
exports.default = ReceiptService;
//# sourceMappingURL=receipt.service.js.map