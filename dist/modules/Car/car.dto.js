"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarDto = exports.CreateCarDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateCarDto {
}
exports.CreateCarDto = CreateCarDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCarDto.prototype, "model", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCarDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCarDto.prototype, "carNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCarDto.prototype, "licenseNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], CreateCarDto.prototype, "photo", void 0);
class UpdateCarDto {
}
exports.UpdateCarDto = UpdateCarDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateCarDto.prototype, "model", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateCarDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateCarDto.prototype, "carNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateCarDto.prototype, "licenseNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateCarDto.prototype, "photo", void 0);
//# sourceMappingURL=car.dto.js.map