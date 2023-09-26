import { models } from "../../utils/database";
import { Advertising } from "./advertising.interface";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";
import { CreateAdvertisingDto } from "./advertising.dto";
import { deleteFile } from "../../utils/file";

class AdvertisingService {
  public advertising = models.Advertising;

  public async getAllAdvertisings(): Promise<Advertising[]> {
    const advertisings = await this.advertising.findAll();
    return advertisings;
  }

  public async createAdvertising(
    advertisingData: CreateAdvertisingDto
  ): Promise<Advertising> {
    if (!advertisingData.photo)
      throw new HttpException(400, "Please input photo");
    const advertising = await this.advertising.create(advertisingData);
    return advertising;
  }

  public async deleteAdvertising(advertisingId: string): Promise<Advertising> {
    if (isEmpty(advertisingId)) throw new HttpException(400, "Please input id");
    const advertising = await this.advertising.findByPk(advertisingId);
    if (!advertising) throw new HttpException(400, "Advertising not found");
    if (advertising.photo) deleteFile(advertising.photo);
    await advertising.destroy();
    return advertising;
  }
}

export default AdvertisingService;
