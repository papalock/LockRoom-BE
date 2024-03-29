"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsModule = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const groups_controller_1 = require("./groups.controller");
const group_entity_1 = require("./entities/group.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const files_service_1 = require("../files/files.service");
const folder_entity_1 = require("../folders/entities/folder.entity");
const file_entity_1 = require("../files/entities/file.entity");
const file_permissions_service_1 = require("../files-permissions/file-permissions.service");
const group_files_permissions_entity_1 = require("../group-files-permissions/entities/group-files-permissions.entity");
const group_files_permissions_service_1 = require("../group-files-permissions/group-files-permissions.service");
const organizations_service_1 = require("../organizations/organizations.service");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const permission_service_1 = require("../permission/permission.service");
const invite_entity_1 = require("../invites/entities/invite.entity");
const permission_entity_1 = require("../permission/entities/permission.entity");
const jwt_1 = require("@nestjs/jwt");
const folders_service_1 = require("../folders/folders.service");
const users_service_1 = require("../users/users.service");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const audit_logs_entities_1 = require("../audit-logs/entities/audit-logs.entities");
let GroupsModule = class GroupsModule {
};
exports.GroupsModule = GroupsModule;
exports.GroupsModule = GroupsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                group_entity_1.Group,
                user_entity_1.User,
                organization_entity_1.Organization,
                folder_entity_1.Folder,
                file_entity_1.File,
                files_permissions_entity_1.FilesPermissions,
                group_files_permissions_entity_1.GroupFilesPermissions,
                invite_entity_1.Invite,
                permission_entity_1.Permission,
                audit_logs_entities_1.AuditLogs
            ]),
        ],
        controllers: [groups_controller_1.GroupsController],
        providers: [
            groups_service_1.GroupsService,
            files_service_1.FilesService,
            file_permissions_service_1.FilesPermissionsService,
            organizations_service_1.OrganizationsService,
            permission_service_1.PermissionService,
            group_files_permissions_service_1.GroupFilesPermissionsService,
            jwt_1.JwtService,
            folders_service_1.FoldersService,
            users_service_1.UsersService,
            audit_logs_service_1.AuditLogsSerivce
        ],
        exports: [groups_service_1.GroupsService],
    })
], GroupsModule);
//# sourceMappingURL=groups.module.js.map