"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShippingDto = exports.CreateShippingDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateShippingDto {
}
exports.CreateShippingDto = CreateShippingDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateShippingDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateShippingDto.prototype, "price", void 0);
class UpdateShippingDto {
}
exports.UpdateShippingDto = UpdateShippingDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateShippingDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", Number)
], UpdateShippingDto.prototype, "price", void 0);
//# sourceMappingURL=shipping.dto.js.map