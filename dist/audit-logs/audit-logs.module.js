"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const audit_logs_entities_1 = require("./entities/audit-logs.entities");
const audit_logs_controller_1 = require("./audit-logs.controller");
const audit_logs_service_1 = require("./audit-logs.service");
const file_entity_1 = require("../files/entities/file.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const group_entity_1 = require("../groups/entities/group.entity");
const uploads_service_1 = require("../uploads/uploads.service");
const files_service_1 = require("../files/files.service");
const folder_entity_1 = require("../folders/entities/folder.entity");
const file_permissions_service_1 = require("../files-permissions/file-permissions.service");
const group_files_permissions_service_1 = require("../group-files-permissions/group-files-permissions.service");
const organizations_service_1 = require("../organizations/organizations.service");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const permission_service_1 = require("../permission/permission.service");
const group_files_permissions_entity_1 = require("../group-files-permissions/entities/group-files-permissions.entity");
const permission_entity_1 = require("../permission/entities/permission.entity");
const invite_entity_1 = require("../invites/entities/invite.entity");
const jwt_1 = require("@nestjs/jwt");
const folders_service_1 = require("../folders/folders.service");
const users_service_1 = require("../users/users.service");
let AuditLogsModule = class AuditLogsModule {
};
exports.AuditLogsModule = AuditLogsModule;
exports.AuditLogsModule = AuditLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                audit_logs_entities_1.AuditLogs,
                file_entity_1.File,
                organization_entity_1.Organization,
                group_entity_1.Group,
                folder_entity_1.Folder,
                files_permissions_entity_1.FilesPermissions,
                group_files_permissions_entity_1.GroupFilesPermissions,
                permission_entity_1.Permission,
                invite_entity_1.Invite,
                audit_logs_entities_1.AuditLogs
            ]),
        ],
        controllers: [audit_logs_controller_1.AuditLogsController],
        providers: [
            audit_logs_service_1.AuditLogsSerivce,
            uploads_service_1.UploadService,
            files_service_1.FilesService,
            file_permissions_service_1.FilesPermissionsService,
            group_files_permissions_service_1.GroupFilesPermissionsService,
            organizations_service_1.OrganizationsService,
            permission_service_1.PermissionService,
            jwt_1.JwtService,
            folders_service_1.FoldersService,
            users_service_1.UsersService,
            audit_logs_service_1.AuditLogsSerivce
        ],
        exports: [audit_logs_service_1.AuditLogsSerivce],
    })
], AuditLogsModule);
//# sourceMappingURL=audit-logs.module.js.map