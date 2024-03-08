"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_entity_1 = require("../../users/entities/user.entity");
const invite_entity_1 = require("../../invites/entities/invite.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const group_files_permissions_entity_1 = require("../../group-files-permissions/entities/group-files-permissions.entity");
let Group = class Group {
    addId() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Group = Group;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdGroups),
    __metadata("design:type", user_entity_1.User)
], Group.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.groups),
    __metadata("design:type", Array)
], Group.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invite_entity_1.Invite, (invite) => invite.group),
    __metadata("design:type", Array)
], Group.prototype, "invites", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (organization) => organization.groups, { onDelete: 'CASCADE' }),
    __metadata("design:type", organization_entity_1.Organization)
], Group.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_files_permissions_entity_1.GroupFilesPermissions, (groupFilesPermissions) => groupFilesPermissions.group),
    __metadata("design:type", Array)
], Group.prototype, "group_files_permissions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Group.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Group.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Group.prototype, "addId", null);
exports.Group = Group = __decorate([
    (0, typeorm_1.Entity)()
], Group);
//# sourceMappingURL=group.entity.js.map