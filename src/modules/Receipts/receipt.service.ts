import axios from "axios";
import config from "../../config/config";
import { models } from "../../utils/database";

class ReceiptService {
  public user = models.User;
  private auth: {} = {
    headers: {
      "X-Auth": `${config.PAYME_ID}:${config.PAYME_PASSWORD}`,
    },
  };

  public async createCard(
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

    return response.data.result.card.token;
  }

  public async getVerifyCode(account: number, token: string): Promise<void> {
    const data = {
      id: account,
      method: "cards.get_verify_code",
      params: {
        token,
      },
    };
    console.log(data);
    const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);

    console.log(response.data);
  }

  public async verify(
    id: number,
    token: string,
    code: string,
    userId: string
  ): Promise<void> {
    const data = {
      id,
      method: "cards.verify",
      params: {
        token,
        code,
      },
    };
    const response = await axios.post(config.PAYME_ENDPOINT, data, this.auth);
    console.log(response.data);
    if (response.status === 200) {
      const user = await this.user.findByPk(userId);
      if (user) {
        await user.update({ card: response.data.card.token });
      }
    }
  }

  public async createReceipt(): Promise<void> {}

  public async payReceipt(): Promise<void> {}

  public async addCard(): Promise<void> {
    const cardToken = await this.createCard("8600495473316478", "0399", 123);
    if (cardToken) {
      await this.getVerifyCode(123, cardToken);
      // const verifedCardToken = await this.verify(123, cardToken, "666666");
    }
  }

  public async pay(id: number, code: string): Promise<{}> {
    // await this.verify(id, token, code);

    // console.log(cardToken);
    return {};
  }
}

export default ReceiptService;
