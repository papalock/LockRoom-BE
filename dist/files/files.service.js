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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const folder_entity_1 = require("../folders/entities/folder.entity");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
const file_permissions_service_1 = require("../files-permissions/file-permissions.service");
const group_files_permissions_service_1 = require("../group-files-permissions/group-files-permissions.service");
const organizations_service_1 = require("../organizations/organizations.service");
let FilesService = class FilesService {
    constructor(foldersRepository, fileRepository, userRepository, fpService, gfpService, orgService) {
        this.foldersRepository = foldersRepository;
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.fpService = fpService;
        this.gfpService = gfpService;
        this.orgService = orgService;
    }
    create(createFileDto) {
        return 'This action adds a new file';
    }
    async addFileToAFolder(name, folder_id, user_id, organization_id, mime_type) {
        try {
            const find_user = await this.userRepository.findOne({
                where: { id: user_id },
            });
            if (!find_user)
                throw new common_1.NotFoundException('user not found');
            const find_folder = await this.foldersRepository.findOne({
                where: { id: folder_id },
            });
            if (!find_folder)
                throw new common_1.NotFoundException('folder not found');
            const all_child_files = await this.fileRepository.find({
                where: {
                    folder: {
                        id: folder_id,
                    },
                },
            });
            const all_child_folders = await this.foldersRepository.find({
                where: {
                    parent_folder_id: folder_id,
                },
            });
            const treeIndex = `${find_folder.tree_index}.`;
            const next = all_child_files.length + all_child_folders.length > 0
                ? `${all_child_files.length + all_child_folders.length + 1}`
                : 1;
            const organization = await this.orgService.findOne(organization_id);
            const new_file = this.fileRepository.create({
                name,
                user: find_user,
                folder: find_folder,
                tree_index: treeIndex + next,
                organization,
                mime_type,
                bucket_url: 'https://lockroom.s3.amazonaws.com' + name
            });
            const saved_file = await this.fileRepository.save(new_file);
            const file_permissions = await this.fpService.createFilePermissions(saved_file);
            const new_group_files_permissions = await this.gfpService.createGroupFilePermissionsFoAllGroups(organization_id, file_permissions);
            return { file_permissions, saved_file, new_group_files_permissions };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllFilesByOrganization(organization_id) {
        return this.fileRepository.find({
            relations: ['folder'],
            where: {
                organization: {
                    id: organization_id,
                },
            },
        });
    }
    async getFilesWithGroupPermissions(organization_id) {
        try {
            const find_files = await this.getAllFilesByOrganization(organization_id);
            const file_ids = find_files.map(file => file.id);
            const find_group_files_permissions = this.gfpService.getGroupFilesPermissiosnByFileIds(file_ids);
            console.log(find_group_files_permissions);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return `This action returns all files`;
    }
    findOne(id) {
        return `This action returns a #${id} file`;
    }
    update(id, updateFileDto) {
        return `This action updates a #${id} file`;
    }
    remove(id) {
        return `This action removes a #${id} file`;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(folder_entity_1.Folder)),
    __param(1, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        file_permissions_service_1.FilesPermissionsService,
        group_files_permissions_service_1.GroupFilesPermissionsService,
        organizations_service_1.OrganizationsService])
], FilesService);
//# sourceMappingURL=files.service.js.map