"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupFilesPermissionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const group_files_permissions_entity_1 = require("./entities/group-files-permissions.entity");
const group_files_permissions_service_1 = require("./group-files-permissions.service");
const groups_service_1 = require("../groups/groups.service");
const group_entity_1 = require("../groups/entities/group.entity");
const user_entity_1 = require("../users/entities/user.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const files_service_1 = require("../files/files.service");
const folder_entity_1 = require("../folders/entities/folder.entity");
const file_entity_1 = require("../files/entities/file.entity");
const file_permissions_service_1 = require("../files-permissions/file-permissions.service");
const organizations_service_1 = require("../organizations/organizations.service");
const permission_entity_1 = require("../permission/entities/permission.entity");
const permission_service_1 = require("../permission/permission.service");
const invite_entity_1 = require("../invites/entities/invite.entity");
let GroupFilesPermissionsModule = class GroupFilesPermissionsModule {
};
exports.GroupFilesPermissionsModule = GroupFilesPermissionsModule;
exports.GroupFilesPermissionsModule = GroupFilesPermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                group_entity_1.Group,
                user_entity_1.User,
                organization_entity_1.Organization,
                files_permissions_entity_1.FilesPermissions,
                folder_entity_1.Folder,
                file_entity_1.File,
                invite_entity_1.Invite,
                group_files_permissions_entity_1.GroupFilesPermissions,
                permission_entity_1.Permission,
            ]),
        ],
        providers: [
            group_files_permissions_service_1.GroupFilesPermissionsService,
            groups_service_1.GroupsService,
            files_service_1.FilesService,
            file_permissions_service_1.FilesPermissionsService,
            organizations_service_1.OrganizationsService,
            permission_service_1.PermissionService,
        ],
        exports: [group_files_permissions_service_1.GroupFilesPermissionsService],
    })
], GroupFilesPermissionsModule);
//# sourceMappingURL=group-files-permissions.module.js.map