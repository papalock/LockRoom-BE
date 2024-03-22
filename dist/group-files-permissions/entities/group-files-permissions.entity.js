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
exports.GroupFilesPermissions = void 0;
const typeorm_1 = require("typeorm");
const files_permissions_entity_1 = require("../../files-permissions/entities/files-permissions.entity");
const uuid_1 = require("uuid");
const group_entity_1 = require("../../groups/entities/group.entity");
let GroupFilesPermissions = class GroupFilesPermissions {
    addId() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.GroupFilesPermissions = GroupFilesPermissions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], GroupFilesPermissions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.group_files_permissions),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", group_entity_1.Group)
], GroupFilesPermissions.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => files_permissions_entity_1.FilesPermissions, (filePermission) => filePermission.group_files_permissions),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", files_permissions_entity_1.FilesPermissions)
], GroupFilesPermissions.prototype, "file_permission", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], GroupFilesPermissions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], GroupFilesPermissions.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroupFilesPermissions.prototype, "addId", null);
exports.GroupFilesPermissions = GroupFilesPermissions = __decorate([
    (0, typeorm_1.Entity)()
], GroupFilesPermissions);
//# sourceMappingURL=group-files-permissions.entity.js.map