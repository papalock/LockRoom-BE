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
exports.GroupFilesPermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_files_permissions_entity_1 = require("./entities/group-files-permissions.entity");
const group_entity_1 = require("../groups/entities/group.entity");
const typeorm_3 = require("typeorm");
let GroupFilesPermissionsService = class GroupFilesPermissionsService {
    constructor(groupFilePermRepo, groupsRepository) {
        this.groupFilePermRepo = groupFilePermRepo;
        this.groupsRepository = groupsRepository;
    }
    async createGroupFilePermissionsFoAllGroups(organization_id, files_permissions) {
        try {
            const groups = await this.groupsRepository.find({
                where: {
                    organization: {
                        id: organization_id,
                    },
                },
            });
            const group_files_permissions = groups
                .map((group) => {
                return files_permissions.map((fp) => {
                    return {
                        group,
                        file_permission: fp,
                    };
                });
            })
                .flat();
            console.log(group_files_permissions);
            const new_group_files_permissions = await this.groupFilePermRepo.save(group_files_permissions);
            return new_group_files_permissions;
        }
        catch (error) {
            console.log(error);
        }
    }
    async createGroupFilePermissionsForOneGroup(group, files_permissions) {
        try {
            const new_fp = files_permissions.map((fp) => {
                return {
                    group,
                    file_permission: fp,
                };
            });
            console.log(new_fp);
            const new_group_files_permissions = await this.groupFilePermRepo.save(new_fp);
            return new_group_files_permissions;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateGroupFilePermissions(group_id, file_permission_id, status) {
        try {
            const find_group_files_permissions = await this.groupFilePermRepo.findOne({
                relations: ['group', 'file_permission'],
                where: {
                    group: {
                        id: group_id,
                    },
                    file_permission: {
                        id: file_permission_id,
                    },
                },
            });
            find_group_files_permissions.file_permission.permission.status = status;
            await this.groupFilePermRepo.save(find_group_files_permissions);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getGroupFilesPermissiosnByFileIds(file_ids) {
        try {
            return await this.groupFilePermRepo.find({
                where: {
                    file_permission: {
                        file: {
                            id: (0, typeorm_3.In)(file_ids)
                        }
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.GroupFilesPermissionsService = GroupFilesPermissionsService;
exports.GroupFilesPermissionsService = GroupFilesPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_files_permissions_entity_1.GroupFilesPermissions)),
    __param(1, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GroupFilesPermissionsService);
//# sourceMappingURL=group-files-permissions.service.js.map