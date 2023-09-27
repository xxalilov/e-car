import { NextFunction, Request, Response } from "express";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
declare class ProductController {
    private productService;
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProductById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createProduct(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    updateProduct(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    searchProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default ProductController;
