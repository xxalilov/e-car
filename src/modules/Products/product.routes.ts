import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import { upload } from "../../utils/file";
import ProductController from "./product.controller";

class ProductRouter implements Routes {
  public path = "/products";
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware("admin"),
      // validationMiddleware(CreateCarDto, "body"),
      upload.fields([{ name: "photo", maxCount: 6 }]),
      this.productController.createProduct.bind(this.productController)
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware("admin"),
      // validationMiddleware(UpdateCarDto, "body"),
      upload.fields([{ name: "photo", maxCount: 1 }]),
      this.productController.updateProduct.bind(this.productController)
    );
    this.router.get(
      `${this.path}`,
      authMiddleware("all"),
      this.productController.getAllProducts.bind(this.productController)
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware("admin"),
      this.productController.deleteProduct.bind(this.productController)
    );
  }
}

export default ProductRouter;
