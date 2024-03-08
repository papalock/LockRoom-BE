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
exports.Invite = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_entity_1 = require("../../users/entities/user.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
let Invite = class Invite {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Invite = Invite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Invite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sent_invites),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", user_entity_1.User)
], Invite.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.invites),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", group_entity_1.Group)
], Invite.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (organization) => organization.invites, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", organization_entity_1.Organization)
], Invite.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Invite.prototype, "sent_to", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], Invite.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Invite.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Invite.prototype, "updatedAt", void 0);
exports.Invite = Invite = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], Invite);
//# sourceMappingURL=invite.entity.js.map