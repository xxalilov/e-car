"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminPassword = exports.UpdateAdminDetails = exports.CreateAdmin = exports.UpdateAdminEmail = exports.CreateAdminDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateAdminDto {
}
exports.CreateAdminDto = CreateAdminDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], CreateAdminDto.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
class UpdateAdminEmail {
}
exports.UpdateAdminEmail = UpdateAdminEmail;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateAdminEmail.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UpdateAdminEmail.prototype, "email", void 0);
class CreateAdmin {
}
exports.CreateAdmin = CreateAdmin;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], CreateAdmin.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CreateAdmin.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAdmin.prototype, "password", void 0);
class UpdateAdminDetails {
}
exports.UpdateAdminDetails = UpdateAdminDetails;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateAdminDetails.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateAdminDetails.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ always: false }),
    tslib_1.__metadata("design:type", String)
], UpdateAdminDetails.prototype, "password", void 0);
class UpdateAdminPassword {
}
exports.UpdateAdminPassword = UpdateAdminPassword;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateAdminPassword.prototype, "currentPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateAdminPassword.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateAdminPassword.prototype, "reapetPassword", void 0);
//# sourceMappingURL=admin.dto.js.map