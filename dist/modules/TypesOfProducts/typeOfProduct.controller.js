"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeOfProduct_service_1 = tslib_1.__importDefault(require("./typeOfProduct.service"));
class TypeOfProductController {
    constructor() {
        this.typeOfProductService = new typeOfProduct_service_1.default();
    }
    async getAllTypeOfProduct(req, res, next) {
        try {
            const lang = req.query.lang.toString();
            const findAllTypeOfProductsData = await this.typeOfProductService.getAllTypesOfProduct(lang);
            res
                .status(200)
                .json({ data: findAllTypeOfProductsData, message: "findAll" });
        }
        catch (error) {
            next(error);
        }
    }
    async createTypeOfProduct(req, res, next) {
        try {
            const data = req.body;
            if (req.files && req.files.photo) {
                const photo = req.files.photo;
                if (photo) {
                    data.photo = photo[0].path;
                }
            }
            const newTypeOfProduct = await this.typeOfProductService.createTypeOfProduct(data);
            res.status(201).json({ data: newTypeOfProduct, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateTypeOfProduct(req, res, next) {
        try {
            const typeOfProductId = req.params.id;
            const data = req.body;
            if (req.files && req.files.photo) {
                const photo = req.files.photo;
                if (photo) {
                    data.photo = photo[0].path;
                }
            }
            const updatedTypeOfProduct = await this.typeOfProductService.updateTypeOfProduct(typeOfProductId, data);
            res.status(200).json({ data: updatedTypeOfProduct, message: "updated" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteTypeOfProduct(req, res, next) {
        try {
            const typeOfProductId = req.params.id;
            const deletedTypeOfProduct = await this.typeOfProductService.deleteTypeOfProduct(typeOfProductId);
            res.status(200).json({ data: deletedTypeOfProduct, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = TypeOfProductController;
//# sourceMappingURL=typeOfProduct.controller.js.map