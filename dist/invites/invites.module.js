"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitesModule = void 0;
const common_1 = require("@nestjs/common");
const invites_service_1 = require("./invites.service");
const invites_controller_1 = require("./invites.controller");
const typeorm_1 = require("@nestjs/typeorm");
const invite_entity_1 = require("./entities/invite.entity");
const user_entity_1 = require("../users/entities/user.entity");
const group_entity_1 = require("../groups/entities/group.entity");
const jwt_1 = require("@nestjs/jwt");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const groups_service_1 = require("../groups/groups.service");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const files_service_1 = require("../files/files.service");
const group_files_permissions_entity_1 = require("../group-files-permissions/entities/group-files-permissions.entity");
const group_files_permissions_service_1 = require("../group-files-permissions/group-files-permissions.service");
const folder_entity_1 = require("../folders/entities/folder.entity");
const file_permissions_service_1 = require("../files-permissions/file-permissions.service");
const organizations_service_1 = require("../organizations/organizations.service");
const permission_service_1 = require("../permission/permission.service");
const permission_entity_1 = require("../permission/entities/permission.entity");
let InvitesModule = class InvitesModule {
};
exports.InvitesModule = InvitesModule;
exports.InvitesModule = InvitesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                invite_entity_1.Invite,
                user_entity_1.User,
                group_entity_1.Group,
                organization_entity_1.Organization,
                files_permissions_entity_1.FilesPermissions,
                folder_entity_1.Folder,
                File,
                group_files_permissions_entity_1.GroupFilesPermissions,
                permission_entity_1.Permission
            ]),
        ],
        controllers: [invites_controller_1.InvitesController],
        providers: [
            invites_service_1.InvitesService,
            jwt_1.JwtService,
            groups_service_1.GroupsService,
            files_service_1.FilesService,
            group_files_permissions_service_1.GroupFilesPermissionsService,
            file_permissions_service_1.FilesPermissionsService,
            organizations_service_1.OrganizationsService,
            permission_service_1.PermissionService,
        ],
        exports: [invites_service_1.InvitesService],
    })
], InvitesModule);
//# sourceMappingURL=invites.module.js.map