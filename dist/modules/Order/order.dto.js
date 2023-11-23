"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOrderDto.prototype, "shipping_type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOrderDto.prototype, "shipping_address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOrderDto.prototype, "payment_type", void 0);
//# sourceMappingURL=order.dto.js.map