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
exports.AuditLogs = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const file_entity_1 = require("../../files/entities/file.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
let AuditLogs = class AuditLogs {
    addId() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.AuditLogs = AuditLogs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditLogs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], AuditLogs.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.audit_log),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], AuditLogs.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.audit_log),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", group_entity_1.Group)
], AuditLogs.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (org) => org.audit_log),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", organization_entity_1.Organization)
], AuditLogs.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.File, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", file_entity_1.File)
], AuditLogs.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AuditLogs.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AuditLogs.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuditLogs.prototype, "addId", null);
exports.AuditLogs = AuditLogs = __decorate([
    (0, typeorm_1.Entity)()
], AuditLogs);
//# sourceMappingURL=audit-logs.entities.js.map