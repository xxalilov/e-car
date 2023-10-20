"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTypeOfProductDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateTypeOfProductDto {
}
exports.CreateTypeOfProductDto = CreateTypeOfProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTypeOfProductDto.prototype, "uz", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTypeOfProductDto.prototype, "eng", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTypeOfProductDto.prototype, "ru", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], CreateTypeOfProductDto.prototype, "photo", void 0);
//# sourceMappingURL=typeOfProduct.dto.js.map