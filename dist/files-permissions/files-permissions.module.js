"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesPermissionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const files_permissions_entity_1 = require("./entities/files-permissions.entity");
const file_permissions_service_1 = require("./file-permissions.service");
const files_permissiosn_controller_1 = require("./files-permissiosn.controller");
const permission_entity_1 = require("../permission/entities/permission.entity");
const permission_service_1 = require("../permission/permission.service");
let FilesPermissionsModule = class FilesPermissionsModule {
};
exports.FilesPermissionsModule = FilesPermissionsModule;
exports.FilesPermissionsModule = FilesPermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([files_permissions_entity_1.FilesPermissions, permission_entity_1.Permission])],
        controllers: [files_permissiosn_controller_1.FilesPermissionsController],
        providers: [file_permissions_service_1.FilesPermissionsService, permission_service_1.PermissionService],
        exports: [file_permissions_service_1.FilesPermissionsService],
    })
], FilesPermissionsModule);
//# sourceMappingURL=files-permissions.module.js.map