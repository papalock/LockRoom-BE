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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesPermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const files_permissions_entity_1 = require("./entities/files-permissions.entity");
const permission_service_1 = require("../permission/permission.service");
let FilesPermissionsService = class FilesPermissionsService {
    constructor(filePermRepo, permissionService) {
        this.filePermRepo = filePermRepo;
        this.permissionService = permissionService;
    }
    async createFilePermissions(file) {
        try {
            const permissions = await this.permissionService.createNewPermissions();
            const file_permissions = permissions.map((permission) => {
                return {
                    file,
                    permission,
                };
            });
            const new_files_permissions = await this.filePermRepo.save(file_permissions);
            return new_files_permissions;
        }
        catch (error) {
            console.log(error);
        }
    }
    async findFilePermissiosn(file_id) {
        return await this.filePermRepo.find({
            where: {
                file: {
                    id: file_id
                }
            }
        });
    }
};
exports.FilesPermissionsService = FilesPermissionsService;
exports.FilesPermissionsService = FilesPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(files_permissions_entity_1.FilesPermissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        permission_service_1.PermissionService])
], FilesPermissionsService);
//# sourceMappingURL=file-permissions.service.js.map