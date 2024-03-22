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
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
const invite_entity_1 = require("../../invites/entities/invite.entity");
const uuid_1 = require("uuid");
const file_entity_1 = require("../../files/entities/file.entity");
const folder_entity_1 = require("../../folders/entities/folder.entity");
const audit_logs_entities_1 = require("../../audit-logs/entities/audit-logs.entities");
let Organization = class Organization {
    addId() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Organization = Organization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.organization_created),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Organization.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.organizations_added_in),
    __metadata("design:type", Array)
], Organization.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_entity_1.Group, (group) => group.organization, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Organization.prototype, "groups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invite_entity_1.Invite, (invite) => invite.organization, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Organization.prototype, "invites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => file_entity_1.File, (file) => file.organization),
    __metadata("design:type", Array)
], Organization.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => folder_entity_1.Folder, (folder) => folder.organization),
    __metadata("design:type", Array)
], Organization.prototype, "folder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => audit_logs_entities_1.AuditLogs, auditLog => auditLog.organization),
    __metadata("design:type", Array)
], Organization.prototype, "audit_log", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Organization.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Organization.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Organization.prototype, "addId", null);
exports.Organization = Organization = __decorate([
    (0, typeorm_1.Entity)()
], Organization);
//# sourceMappingURL=organization.entity.js.map