"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const uploads_module_1 = require("./uploads/uploads.module");
const folders_module_1 = require("./folders/folders.module");
const folder_entity_1 = require("./folders/entities/folder.entity");
const mail_controller_1 = require("./mail/mail.controller");
const email_service_1 = require("./email/email.service");
const invites_module_1 = require("./invites/invites.module");
const invite_entity_1 = require("./invites/entities/invite.entity");
const permission_module_1 = require("./permission/permission.module");
const groups_module_1 = require("./groups/groups.module");
const permission_entity_1 = require("./permission/entities/permission.entity");
const group_entity_1 = require("./groups/entities/group.entity");
const files_module_1 = require("./files/files.module");
const files_permissions_entity_1 = require("./files-permissions/entities/files-permissions.entity");
const files_permissions_module_1 = require("./files-permissions/files-permissions.module");
const file_entity_1 = require("./files/entities/file.entity");
const jwt_1 = require("@nestjs/jwt");
const throttler_1 = require("@nestjs/throttler");
const organizations_module_1 = require("./organizations/organizations.module");
const organization_entity_1 = require("./organizations/entities/organization.entity");
const group_files_permissions_entity_1 = require("./group-files-permissions/entities/group-files-permissions.entity");
const group_files_permissions_module_1 = require("./group-files-permissions/group-files-permissions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [
                    user_entity_1.User,
                    folder_entity_1.Folder,
                    invite_entity_1.Invite,
                    group_entity_1.Group,
                    organization_entity_1.Organization,
                    file_entity_1.File,
                    permission_entity_1.Permission,
                    files_permissions_entity_1.FilesPermissions,
                    group_files_permissions_entity_1.GroupFilesPermissions
                ],
                synchronize: true,
                logging: 'all',
                ssl: false,
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60,
                        limit: 300,
                    },
                ],
            }),
            users_module_1.UsersModule,
            uploads_module_1.UploadsModule,
            folders_module_1.FoldersModule,
            invites_module_1.InvitesModule,
            permission_module_1.PermissionModule,
            groups_module_1.GroupsModule,
            files_module_1.FilesModule,
            files_permissions_module_1.FilesPermissionsModule,
            organizations_module_1.OrganizationsModule,
            group_files_permissions_module_1.GroupFilesPermissionsModule
        ],
        controllers: [app_controller_1.AppController, mail_controller_1.MailController],
        providers: [app_service_1.AppService, email_service_1.EmailService, jwt_1.JwtService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map