import { Car } from "./car.interface";
import { ResultInterface } from "../../utils/pagination";
import { CreateCarDto, UpdateCarDto } from "./car.dto";
declare class CarService {
    car: typeof import("./car.model").CarModel;
    user: typeof import("../Users/user.model").UserModel;
    getAllCars(page: number, pageSize: number): Promise<ResultInterface>;
    getUserCars(userId: string): Promise<Car[]>;
    getCarById(carId: string): Promise<Car>;
    createCar(carData: CreateCarDto, userId: string): Promise<Car>;
    updateCar(carData: UpdateCarDto, carId: string): Promise<Car>;
    deleteCar(carId: string): Promise<Car>;
}
export default CarService;
