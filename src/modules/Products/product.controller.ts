import {NextFunction, Request, Response} from "express";
import path from "path";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
import ProductService from "./product.service";
import {Product} from "./product.interface";

class ProductController {
    private productService = new ProductService();

    public async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        let typeOfProductId = null;
        let searchProduct = null;
        if (req.query.type) {
            typeOfProductId = req.query.type.toString();
        }
        if (req.query.searchData) {
            searchProduct = req.query.searchData.toString();
        }
        try {
            const findAllCarsData = await this.productService.getAllProduct(
                page,
                pageSize,
                typeOfProductId,
                searchProduct,
                req.query.lang as string
            );
            res.status(200).json({...findAllCarsData, message: "findAll"});
        } catch (error) {
            next(error);
        }
    }

    public async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const findOneProductData: Product =
                await this.productService.getProductById(req.params.id, req.query.lang as string);
            res.status(200).json({data: findOneProductData, message: "findOne"});
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
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path.join(__dirname, '../../../');
                const files: ([] | any) = req.files.photo;

                const photos = [];

                if (files.length > 0) {
                    for (let p of files) {
                        const newFileName = `file_${Date.now()}-${p.name.replace(/\s/g, "")}`;
                        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                        p.mv(uploadPath, function (err) {
                            if (err) next(err);
                        });
                        photos.push(`uploads/images/${newFileName}`);
                    }
                } else {
                    const newFileName = `file_${Date.now()}-${files.name.replace(/\s/g, "")}`;
                    const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                    files.mv(uploadPath, function (err) {
                        if (err) next(err);
                    });
                    photos.push(`uploads/images/${newFileName}`);
                }

                productData.photos = photos;
            }

            const newProduct = await this.productService.createProduct(productData);
            res.status(201).json({data: newProduct, message: "created"});
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
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path.join(__dirname, '../../../');
                const files: ([] | any) = req.files.photo;

                const photos = [];

                if (files.length > 0) {
                    for (let p of files) {
                        const newFileName = `file_${Date.now()}-${p.name.replace(/\s/g, "")}`;
                        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                        p.mv(uploadPath, function (err) {
                            if (err) next(err);
                        });
                        photos.push(`uploads/images/${newFileName}`);
                    }
                } else {
                    const newFileName = `file_${Date.now()}-${files.name.replace(/\s/g, "")}`;
                    const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                    files.mv(uploadPath, function (err) {
                        if (err) next(err);
                    });
                    photos.push(`uploads/images/${newFileName}`);
                }

                productData.photos = photos;
            }

            const updatedProduct = await this.productService.updateProduct(
                productData,
                productId
            );
            res.status(200).json({data: updatedProduct, message: "updated"});
        } catch (error) {
            next(error);
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;
            const deletedProduct = await this.productService.deleteProduct(productId);
            res.status(200).json({data: deletedProduct, message: "deleted"});
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;
