"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const user_entity_1 = require("../users/entities/user.entity");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const folder_entity_1 = require("../folders/entities/folder.entity");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const file_permissions_service_1 = require("../files-permissions/file-permissions.service");
const permission_service_1 = require("../permission/permission.service");
const permission_entity_1 = require("../permission/entities/permission.entity");
const group_files_permissions_service_1 = require("../group-files-permissions/group-files-permissions.service");
const group_files_permissions_entity_1 = require("../group-files-permissions/entities/group-files-permissions.entity");
const groups_service_1 = require("../groups/groups.service");
const group_entity_1 = require("../groups/entities/group.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const organizations_service_1 = require("../organizations/organizations.service");
const invite_entity_1 = require("../invites/entities/invite.entity");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                folder_entity_1.Folder,
                user_entity_1.User,
                file_entity_1.File,
                files_permissions_entity_1.FilesPermissions,
                permission_entity_1.Permission,
                group_files_permissions_entity_1.GroupFilesPermissions,
                group_entity_1.Group,
                organization_entity_1.Organization,
                invite_entity_1.Invite
            ]),
        ],
        controllers: [files_controller_1.FilesController],
        providers: [
            files_service_1.FilesService,
            file_permissions_service_1.FilesPermissionsService,
            permission_service_1.PermissionService,
            group_files_permissions_service_1.GroupFilesPermissionsService,
            groups_service_1.GroupsService,
            organizations_service_1.OrganizationsService,
        ],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map