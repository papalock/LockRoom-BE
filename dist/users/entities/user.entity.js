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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const folder_entity_1 = require("../../folders/entities/folder.entity");
const uuid_1 = require("uuid");
const invite_entity_1 = require("../../invites/entities/invite.entity");
const group_entity_1 = require("../..//groups/entities/group.entity");
const file_entity_1 = require("../../files/entities/file.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
let User = class User {
    addId() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_email_verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_session_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'admin' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "sso_login", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", String)
], User.prototype, "sso_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "display_picture_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "generated_otp", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organization_entity_1.Organization, (organisation) => organisation.creator),
    __metadata("design:type", organization_entity_1.Organization)
], User.prototype, "organization_created", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => organization_entity_1.Organization, (organisation) => organisation.users, {
        cascade: true
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "organizations_added_in", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_entity_1.Group, (group) => group.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdGroups", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => folder_entity_1.Folder, (folder) => folder.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "folders", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => group_entity_1.Group, (group) => group.users, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "groups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invite_entity_1.Invite, (invite) => invite.sender),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "sent_invites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => file_entity_1.File, (file) => file.user),
    __metadata("design:type", Array)
], User.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "addId", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map