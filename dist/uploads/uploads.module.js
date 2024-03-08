"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsModule = void 0;
const common_1 = require("@nestjs/common");
const uploads_controller_1 = require("./uploads.controller");
const uploads_service_1 = require("./uploads.service");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const files_service_1 = require("../files/files.service");
const folder_entity_1 = require("../folders/entities/folder.entity");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("../files/entities/file.entity");
const user_entity_1 = require("../users/entities/user.entity");
const file_permissions_service_1 = require("../files-permissions/file-permissions.service");
const group_files_permissions_service_1 = require("../group-files-permissions/group-files-permissions.service");
const organizations_service_1 = require("../organizations/organizations.service");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const permission_service_1 = require("../permission/permission.service");
const group_files_permissions_entity_1 = require("../group-files-permissions/entities/group-files-permissions.entity");
const group_entity_1 = require("../groups/entities/group.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const invite_entity_1 = require("../invites/entities/invite.entity");
const permission_entity_1 = require("../permission/entities/permission.entity");
let UploadsModule = class UploadsModule {
};
exports.UploadsModule = UploadsModule;
exports.UploadsModule = UploadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: (configService) => ({
                    throttlers: [
                        {
                            ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
                            limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
                        },
                    ],
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                folder_entity_1.Folder,
                file_entity_1.File,
                user_entity_1.User,
                files_permissions_entity_1.FilesPermissions,
                group_files_permissions_entity_1.GroupFilesPermissions,
                group_entity_1.Group,
                organization_entity_1.Organization,
                invite_entity_1.Invite,
                permission_entity_1.Permission
            ]),
        ],
        controllers: [uploads_controller_1.UploadController],
        providers: [
            uploads_service_1.UploadService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            files_service_1.FilesService,
            file_permissions_service_1.FilesPermissionsService,
            group_files_permissions_service_1.GroupFilesPermissionsService,
            organizations_service_1.OrganizationsService,
            permission_service_1.PermissionService
        ],
    })
], UploadsModule);
//# sourceMappingURL=uploads.module.js.map