import axios from "axios";
import config from "../../config/config";
import { models } from "../../utils/database";
import {User} from "../Users/user.interface";
import { HttpException } from "../../exceptions/HttpException";

class ReceiptService {
  public user = models.User;
  public cart = models.Cart;
  private auth: {} = {
    headers: {
      "X-Auth": `${config.PAYME_ID}:${config.PAYME_PASSWORD}`,
    },
  };

  private async createCard(
    number: string,
    expire: string,
    account: number
  ): Promise<string> {
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

    const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);
    if(response.status === 200) {
      if(response.data.result.card.token) {
        return response.data.result.card.token;
      } else {
        throw new HttpException(400, "Something went wrong");
      }
    } else {
      throw new HttpException(400, "Something went wrong");
    }
  }

  private async getVerifyCode(account: number, token: string): Promise<{}> {
    const user = await this.user.findByPk(account);
    const data = {
      id: account,
      method: "cards.get_verify_code",
      params: {
        token,
      },
    };
    const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);

    if (response.status === 200) {
        await user?.update({ card: token });
        return response.data;
    } else {
      throw new HttpException(400, "Something went wrong");
    }
  }

  public async verify(
    id: string,
    token: string,
    code: string,
  ): Promise<{}> {
    const data = {
      id: parseInt(id),
      method: "cards.verify",
      params: {
        token,
        code,
      },
    };
    const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);
    console.log(response.data);
    if (response.status === 200) {
      const user = await this.user.findByPk(id);
      if (user) {
        const responseData = await user.update({ card: response.data.result.card.token });
        return response.data;
      }
    } else {
      throw new HttpException(400, "Something went wrong");
    }
  }
  // public async payReceipt(): Promise<void> {}

  public async addCard(userId: number,card_number: string, card_expire: string): Promise<{}> {
    const cardToken = await this.createCard(card_number, card_expire, userId);
      return await this.getVerifyCode(userId, cardToken);
  }

  public async verifyCode(id: string, code: string): Promise<{}> {
    const user: User = await  this.user.findByPk(id);
    if(user.card) {
      const token = user.card;
      return await this.verify(id, token, code);
    } else  {
      throw new HttpException(500, "Something went wrong");
    };
  }

  public async checkCard(userId: string): Promise<{}> {
    const user: User = await this.user.findByPk(userId);
    if (user.card) {
      const data = {
        id: parseInt(userId),
        method: "cards.check",
        params: {
          token: user.card,
        },
      };
      const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
    }
    return {};
  }

  public async createReceipt(userId: string, shippingAddress: {}): Promise<{}> {
    const userCard = await this.cart.findOne({where: {userId}});

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
              discount: 10000, //Скидка с учетом количества товаров или услуг в тийинах
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

    const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);
    console.log(response.data);
    if (response.status === 200) {
      return response.data;
    }
    return {};
  }

  public  async payReceipts(userId: string, receiptId: string): Promise<{}> {
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

    const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);
    console.log(response.data);
    if (response.status === 200) {
      return response.data;
    }
    return {};
  }
}

export default ReceiptService;
