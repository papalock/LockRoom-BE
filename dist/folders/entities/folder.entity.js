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
exports.Folder = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const uuid_1 = require("uuid");
const file_entity_1 = require("../../files/entities/file.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
let Folder = class Folder {
    addId() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Folder = Folder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Folder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Folder.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Folder, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Folder)
], Folder.prototype, "parentFolder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Folder.prototype, "parent_folder_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Folder.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Folder.prototype, "tree_index", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Folder, (Folder) => Folder.parentFolder),
    __metadata("design:type", Array)
], Folder.prototype, "sub_folders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => file_entity_1.File, file => file.folder),
    __metadata("design:type", Array)
], Folder.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.folders),
    __metadata("design:type", Array)
], Folder.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (organization) => organization.files),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", organization_entity_1.Organization)
], Folder.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Folder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Folder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Folder.prototype, "addId", null);
exports.Folder = Folder = __decorate([
    (0, typeorm_1.Entity)()
], Folder);
//# sourceMappingURL=folder.entity.js.map