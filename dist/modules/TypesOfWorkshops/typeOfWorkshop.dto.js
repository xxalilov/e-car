"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTypeOfWorkshopDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateTypeOfWorkshopDto {
}
exports.CreateTypeOfWorkshopDto = CreateTypeOfWorkshopDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTypeOfWorkshopDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], CreateTypeOfWorkshopDto.prototype, "photo", void 0);
//# sourceMappingURL=typeOfWorkshop.dto.js.map