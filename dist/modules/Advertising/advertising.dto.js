"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdvertisingDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateAdvertisingDto {
}
exports.CreateAdvertisingDto = CreateAdvertisingDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAdvertisingDto.prototype, "link", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], CreateAdvertisingDto.prototype, "photo", void 0);
//# sourceMappingURL=advertising.dto.js.map