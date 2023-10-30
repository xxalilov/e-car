"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = tslib_1.__importDefault(require("../../config/config"));
const HttpException_1 = require("../../exceptions/HttpException");
const database_1 = require("../../utils/database");
class PaymeService {
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
            if (response.data.error) {
                throw new HttpException_1.HttpException(400, response.data.error.message);
            }
            else if (response.data.result.card.token) {
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
        const data = {
            id: account,
            method: "cards.get_verify_code",
            params: {
                token,
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        if (response.status === 200) {
            return response.data.result;
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
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new HttpException_1.HttpException(400, "Something went wrong");
        }
    }
    async checkCard(userId, token) {
        const data = {
            id: parseInt(userId),
            method: "cards.check",
            params: {
                token
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        if (response.status === 200) {
            return response.data;
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
    async payReceipts(userId, receiptId, token) {
        const user = await this.user.findByPk(userId);
        const data = {
            id: parseInt(userId),
            method: "receipts.pay",
            params: {
                id: receiptId,
                token,
                payer: {
                    phone: user.phone,
                }
            },
        };
        const response = await axios_1.default.post(config_1.default.PAYME_ENDPOINT, data, this.auth);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    }
}
exports.default = PaymeService;
//# sourceMappingURL=payme.service.js.map