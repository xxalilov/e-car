import { models } from "../../utils/database";
import { Car } from "./car.interface";
import PaginationHelper, { ResultInterface } from "../../utils/pagination";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";
import { CreateCarDto, UpdateCarDto } from "./car.dto";
import { deleteFile } from "../../utils/file";

class CarService {
  public car = models.Car;
  public user = models.User;

  public async getAllCars(
    page: number,
    pageSize: number
  ): Promise<ResultInterface> {
    const paginationHelper = new PaginationHelper(this.car);
    const result = await paginationHelper.paginate(page, pageSize);
    return result;
  }

  public async getCarById(carId: string): Promise<Car> {
    if (isEmpty(carId)) throw new HttpException(400, "carId is empty");
    const car: Car = await this.car.findByPk(carId);
    if (!car) throw new HttpException(400, "Car not found");
    return car;
  }

  public async createCar(carData: CreateCarDto, userId: string): Promise<Car> {
    const user = await this.user.findByPk(userId);
    if (!user) throw new HttpException(400, "User not found");
    const car = await this.car.create({ ...carData, userId });
    return car;
  }

  public async updateCar(carData: UpdateCarDto, carId: string): Promise<Car> {
    const car = await this.car.findByPk(carId);
    if (!car) throw new HttpException(400, "Car not found");
    if (carData.photo && car.photo) deleteFile(car.photo);
    await car.update(carData);
    return car;
  }
}

export default CarService;
