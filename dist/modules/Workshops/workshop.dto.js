"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkshopDto = exports.CreateWorkshopDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateWorkshopDto {
}
exports.CreateWorkshopDto = CreateWorkshopDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "workingTime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "lat", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "long", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateWorkshopDto.prototype, "typeOfWorkshopId", void 0);
class UpdateWorkshopDto {
}
exports.UpdateWorkshopDto = UpdateWorkshopDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "workingTime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "lat", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "long", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateWorkshopDto.prototype, "typeOfWorkshopId", void 0);
//# sourceMappingURL=workshop.dto.js.map