"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersModule = void 0;
const common_1 = require("@nestjs/common");
const folders_service_1 = require("./folders.service");
const typeorm_1 = require("@nestjs/typeorm");
const folder_entity_1 = require("./entities/folder.entity");
const folders_controller_1 = require("./folders.controller");
const user_entity_1 = require("../users/entities/user.entity");
const users_module_1 = require("../users/users.module");
const group_files_permissions_entity_1 = require("../group-files-permissions/entities/group-files-permissions.entity");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const file_entity_1 = require("../files/entities/file.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const group_entity_1 = require("../groups/entities/group.entity");
const jwt_1 = require("@nestjs/jwt");
let FoldersModule = class FoldersModule {
};
exports.FoldersModule = FoldersModule;
exports.FoldersModule = FoldersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                folder_entity_1.Folder,
                user_entity_1.User,
                group_files_permissions_entity_1.GroupFilesPermissions,
                files_permissions_entity_1.FilesPermissions,
                file_entity_1.File,
                organization_entity_1.Organization,
                group_entity_1.Group,
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [folders_controller_1.FoldersController],
        providers: [folders_service_1.FoldersService, jwt_1.JwtService],
        exports: [folders_service_1.FoldersService],
    })
], FoldersModule);
//# sourceMappingURL=folders.module.js.map