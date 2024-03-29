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
exports.FilesPermissions = void 0;
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("../../permission/entities/permission.entity");
const file_entity_1 = require("../../files/entities/file.entity");
const uuid_1 = require("uuid");
const group_files_permissions_entity_1 = require("../../group-files-permissions/entities/group-files-permissions.entity");
let FilesPermissions = class FilesPermissions {
    addId() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.FilesPermissions = FilesPermissions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], FilesPermissions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.File, (file) => file.FilesPermissions, { onDelete: 'CASCADE' }),
    __metadata("design:type", file_entity_1.File)
], FilesPermissions.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permission_entity_1.Permission, (permission) => permission.FilesPermissions),
    __metadata("design:type", permission_entity_1.Permission)
], FilesPermissions.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_files_permissions_entity_1.GroupFilesPermissions, (groupFilePermission) => groupFilePermission.file_permission, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], FilesPermissions.prototype, "group_files_permissions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FilesPermissions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FilesPermissions.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilesPermissions.prototype, "addId", null);
exports.FilesPermissions = FilesPermissions = __decorate([
    (0, typeorm_1.Entity)()
], FilesPermissions);
//# sourceMappingURL=files-permissions.entity.js.map