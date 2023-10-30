"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOfferDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateOfferDto {
}
exports.CreateOfferDto = CreateOfferDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOfferDto.prototype, "text", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOfferDto.prototype, "userId", void 0);
//# sourceMappingURL=offer.dto.js.map