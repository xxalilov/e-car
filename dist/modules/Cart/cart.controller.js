// import { NextFunction, Request, Response } from "express";
// import { RequestWithUser } from "../../modules/Auth/auth.interface";
// import CarService from "./car.service";
// import { Car } from "./car.interface";
// import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";
// import CartService from "./cart.service";
// class CartController {
//   private cartService = new CartService();
//   public async getAllCar(req: Request, res: Response, next: NextFunction) {
//     const page = parseInt(req.query.page as string) || 1;
//     const pageSize = parseInt(req.query.pageSize as string) || 10;
//     try {
//       const findAllCarsData = await this.cartService.getAllCars(page, pageSize);
//       res.status(200).json({ ...findAllCarsData, message: "findAll" });
//     } catch (error) {
//       next(error);
//     }
//   }
//   public async getCarById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const findOneCarData: Car = await this.cartService.getCarById(
//         req.params.id
//       );
//       res.status(200).json({ data: findOneCarData, message: "findOne" });
//     } catch (error) {
//       next(error);
//     }
//   }
//   public async getUserCars(
//     req: RequestWithUser,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const findUserCars = await this.cartService.getUserCars(req.user.id);
//       res.status(200).json({ data: findUserCars, message: "findAll" });
//     } catch (error) {
//       next(error);
//     }
//   }
//   public async createCar(
//     req: RequestWithFile,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const carData = req.body;
//       const userId = req.user.id;
//       console.log(req.files);
//       if (req.files && req.files.photo) {
//         const photo: Photo[] = req.files.photo;
//         carData.photo = photo[0].path;
//       }
//       const newCar = await this.cartService.createCar(carData, userId);
//       res.status(201).json({ data: newCar, message: "created" });
//     } catch (error) {
//       next(error);
//     }
//   }
//   public async updateCar(
//     req: RequestWithFile,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const carData = req.body;
//       const carId = req.params.id;
//       const photo: Photo[] = req.files.photo;
//       if (photo) {
//         carData.photo = photo[0].path;
//       }
//       const updatedCar = await this.cartService.updateCar(carData, carId);
//       res.status(200).json({ data: updatedCar, message: "updated" });
//     } catch (error) {
//       next(error);
//     }
//   }
//   public async deleteCarById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const deletedCarData: Car = await this.cartService.deleteCar(
//         req.params.id
//       );
//       res.status(200).json({ data: deletedCarData, message: "deleted" });
//     } catch (error) {
//       next(error);
//     }
//   }
// }
// export default CartController;
//# sourceMappingURL=cart.controller.js.map