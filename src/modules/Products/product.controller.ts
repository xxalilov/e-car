import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../modules/Auth/auth.interface";
import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";
import ProductService from "./product.service";
import { Product } from "./product.interface";

class ProductController {
  private productService = new ProductService();

  public async getAllProducts(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const typeOfProductId = req.query.type.toString();
    try {
      const findAllCarsData = await this.productService.getAllProduct(
        page,
        pageSize,
        typeOfProductId
      );
      res.status(200).json({ ...findAllCarsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const findOneProductData: Product =
        await this.productService.getProductById(req.params.id);
      res.status(200).json({ data: findOneProductData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  }

  public async createProduct(
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productData = req.body;
      console.log("PRODUCT DATA", productData);
      console.log("FILES", req.files);
      if (req.files && req.files.photo) {
        const photo: Photo[] = req.files.photo;
        let photos = [];
        for (let p of photo) {
          photos.push(p.path);
        }
        productData.photos = photos;
      }
      const newProduct = await this.productService.createProduct(productData);
      res.status(201).json({ data: newProduct, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async updateProduct(
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productData = req.body;
      const productId = req.params.id;
      if (req.files && req.files.photo) {
        const photo: Photo[] = req.files.photo;
        productData.photo = photo[0].path;
      }
      const updatedProduct = await this.productService.updateProduct(
        productData,
        productId
      );
      res.status(200).json({ data: updatedProduct, message: "updated" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const deletedProduct = await this.productService.deleteProduct(productId);
      res.status(200).json({ data: deletedProduct, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }

  public async searchProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const searchData = req.query.searchData.toString();
      const foundProducts = await this.productService.searchProduct(searchData);
      res.status(200).json({ data: foundProducts, message: "found" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
