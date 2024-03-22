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
    async addFileToAFolder(name, folder_id, user_id, organization_id, mime_type, size, extension, file_uploaded_name) {
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
            const find_file_same_name = await this.fileRepository.find({
                where: {
                    original_name: name,
                },
            });
            const original_name = name;
            if (find_file_same_name.length > 0) {
                console.log(find_file_same_name.length, 'length file same');
                find_file_same_name.length == 1
                    ? (name = 'copy-' + name)
                    : (name = `copy-${find_file_same_name.length}-${name}`);
            }
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
            console.log(all_child_folders, 'folders');
            const current_tree_index = `${find_folder.tree_index}.`;
            const next = all_child_files.length + all_child_folders.length > 0
                ? `${all_child_files.length + all_child_folders.length + 1}`
                : 1;
            const organization = await this.orgService.findOne(organization_id);
            const new_file = this.fileRepository.create({
                name,
                user: find_user,
                folder: find_folder,
                tree_index: current_tree_index + next,
                organization,
                mime_type,
                bucket_url: 'https://lockroom.s3.amazonaws.com/' + file_uploaded_name,
                size_bytes: size,
                extension,
                file_uploaded_name,
                original_name
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
            const file_ids = find_files.map((file) => file.id);
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
    async findOne(id) {
        return await this.fileRepository.findOne({
            where: {
                id,
            },
        });
    }
    update(id, updateFileDto) {
        return `This action updates a #${id} file`;
    }
    remove(id) {
        return `This action removes a #${id} file`;
    }
    async buildFolderFileStructure(folder) {
        const folder_files = {
            name: folder.name,
            id: folder.id,
            type: 'folder',
            index: folder.tree_index,
            children: [],
        };
        if (folder.files && folder.files.length > 0) {
            for (const file of folder.files) {
                const file_permissions = await this.fpService.findFilePermissiosn(file.id);
                console.log(file_permissions[0].permission.status, file_permissions[0].permission.type);
                const file_access = {
                    type: 'file',
                    name: file.name,
                    has_view_access: file_permissions[0].permission.type == 'view'
                        ? file_permissions[0].permission.status
                        : file_permissions[1].permission.status,
                    has_download_access: file_permissions[1].permission.type == 'download'
                        ? file_permissions[1].permission.status
                        : file_permissions[0].permission.status,
                    index: file.tree_index,
                    mime_type: file.mime_type,
                    file_id: file.id,
                    url: file.bucket_url,
                    extension: file.extension,
                };
                folder_files.children.push(file_access);
            }
        }
        folder_files.children = folder_files.children.sort((a, b) => Number(a.index) - Number(b.index));
        return folder_files;
    }
    async getFoldersAndFilesByOrganizationId(organizationId, parent_folder_id) {
        const root_folders = await this.foldersRepository.find({
            where: {
                organization: { id: organizationId },
                parent_folder_id: parent_folder_id,
            },
            relations: ['sub_folders', 'files.organization'],
            order: {
                tree_index: 'ASC',
            },
        });
        const folder_file_structures = [];
        if (root_folders.length > 0) {
            for (const root_folder of root_folders) {
                const folder_file_structure = await this.buildFolderFileStructure(root_folder);
                folder_file_structures.push(folder_file_structure);
            }
            for (const sub of folder_file_structures) {
                const folder_file_structure = await this.getFoldersAndFilesByOrganizationId(organizationId, sub.id);
                sub.children.push(...folder_file_structure);
            }
        }
        return folder_file_structures;
    }
    async getAllFilesByOrg(organizationId, parent_folder_id) {
        const result = await this.getFoldersAndFilesByOrganizationId(organizationId, parent_folder_id);
        const home_folder = JSON.parse(JSON.stringify(await this.foldersRepository.findOne({
            where: {
                organization: { id: organizationId },
                id: parent_folder_id,
            },
            relations: ['sub_folders', 'files.organization'],
        })));
        const folder_file_structure = await this.buildFolderFileStructure(home_folder);
        folder_file_structure.children = [
            ...folder_file_structure.children,
            ...result,
        ].sort((a, b) => a.index - b.index);
        return folder_file_structure;
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