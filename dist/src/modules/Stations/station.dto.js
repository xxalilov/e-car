"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStationDto = exports.CreateStationDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateStationDto {
}
exports.CreateStationDto = CreateStationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStationDto.prototype, "lat", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStationDto.prototype, "long", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStationDto.prototype, "title_uz", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStationDto.prototype, "title_ru", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStationDto.prototype, "title_eng", void 0);
class UpdateStationDto {
}
exports.UpdateStationDto = UpdateStationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateStationDto.prototype, "lat", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateStationDto.prototype, "long", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateStationDto.prototype, "title_uz", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateStationDto.prototype, "title_ru", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateStationDto.prototype, "title_eng", void 0);
//# sourceMappingURL=station.dto.js.map