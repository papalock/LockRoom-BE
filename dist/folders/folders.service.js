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
exports.FoldersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const folder_entity_1 = require("./entities/folder.entity");
const users_service_1 = require("../users/users.service");
const file_entity_1 = require("../files/entities/file.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
let FoldersService = class FoldersService {
    constructor(foldersRepository, fileRepository, orgRepository, userService) {
        this.foldersRepository = foldersRepository;
        this.fileRepository = fileRepository;
        this.orgRepository = orgRepository;
        this.userService = userService;
    }
    async create(name, user_id, organization_id, parent_folder_id) {
        const parent_folder = await this.foldersRepository.findOne({
            where: {
                id: parent_folder_id,
            },
        });
        if (!parent_folder)
            throw new common_1.NotFoundException('parent folder found');
        const child_folders_with_same_name = await this.foldersRepository.find({
            where: {
                parent_folder_id,
                name: name,
            },
        });
        if (child_folders_with_same_name.length > 0)
            throw new common_1.ConflictException('folder already exists with same name');
        const user = await this.userService.findOne({
            id: user_id,
        });
        const all_child_folders = await this.foldersRepository.find({
            where: {
                parent_folder_id,
            },
        });
        const all_child_files = await this.fileRepository.find({
            where: {
                folder: {
                    id: parent_folder_id,
                },
            },
        });
        const treeIndex = `${parent_folder.tree_index}.`;
        const next = all_child_folders.length + all_child_files.length > 0
            ? `${all_child_folders.length + all_child_files.length + 1}`
            : 1;
        if (!user)
            throw new common_1.NotFoundException('user not found');
        const find_org = await this.orgRepository.findOne({
            where: {
                id: organization_id,
            },
        });
        const new_folder = await this.foldersRepository.save({
            name,
            parent_folder_id,
            tree_index: treeIndex + next,
            users: [user],
            organization: find_org,
        });
        const new_folder_1 = {
            ...new_folder,
            folder_name: new_folder.name,
            folder_parent_folder_id: new_folder.parent_folder_id,
            folder_tree_index: new_folder.tree_index,
            folder_createdAt: new_folder.createdAt,
            folder_id: new_folder.id,
        };
        const query = this.foldersRepository
            .createQueryBuilder('folder')
            .leftJoinAndSelect('folder.users', 'user')
            .where('user.id = :userId', { userId: user.id });
        if (parent_folder_id) {
            query.andWhere('folder.parent_folder_id = :parent_folder_id', {
                parent_folder_id,
            });
        }
        else {
            query.andWhere('folder.parent_folder_id IS NULL');
        }
        const data = await query.getMany();
        return { new_folder: new_folder_1, files_count: data.length };
    }
    async findAll() {
        const repos = await this.foldersRepository.find();
    }
    async findAllByOrganization(organization_id, user_id) {
        const query1 = await this.foldersRepository
            .createQueryBuilder('folder')
            .leftJoinAndSelect('folder.users', 'user')
            .leftJoin('folder.sub_folders', 'sub_folder')
            .addSelect('COUNT(DISTINCT sub_folder.id)', 'sub_folder_count')
            .where('user.id = :userId', { userId: user_id })
            .andWhere('folder.organization.id = :organizationId', {
            organizationId: organization_id,
        })
            .groupBy('folder.id, user.id')
            .orderBy('folder.createdAt', 'ASC')
            .getRawMany();
        return {
            sub_folder_count: query1,
        };
    }
    async findAllByUserId(userId) {
        const repos = await this.foldersRepository.find({
            where: {
                users: {
                    id: userId,
                },
            },
        });
        console.log(repos);
    }
    findOne(id) {
        return `This action returns a #${id} folder`;
    }
    async update(prev_name, new_name, parent_folder_id) {
        const findRepo = await this.foldersRepository.find({
            where: {
                parent_folder_id,
                name: prev_name,
            },
        });
        if (findRepo.length == 0)
            throw new common_1.NotFoundException('folder not found');
        if (findRepo.length > 1)
            throw new common_1.ConflictException('duplicate folder found with old name');
        const findRepoWithNewName = await this.foldersRepository.find({
            where: {
                parent_folder_id,
                name: new_name,
            },
        });
        if (findRepoWithNewName.length > 0)
            throw new common_1.ConflictException('duplicate folder found with new name');
        await this.foldersRepository.update({
            parent_folder_id,
            name: prev_name,
        }, {
            name: new_name,
        });
    }
    async remove(id) {
        return await this.foldersRepository.update({
            id: id,
        }, {
            is_deleted: true,
        });
    }
    async createFolderWithDefaultPermissions(name, sub, parent_folder_id) {
        const parent_folder = await this.foldersRepository.findOne({
            where: {
                id: parent_folder_id,
            },
        });
        if (!parent_folder)
            throw new common_1.NotFoundException('parent folder found');
        const child_folders_with_same_name = await this.foldersRepository.find({
            where: {
                parent_folder_id,
                name: name,
            },
        });
        if (child_folders_with_same_name.length > 0)
            throw new common_1.ConflictException('folder already exists with same name');
        const user = await this.userService.findOne({
            sub,
        });
        const all_child_folders = await this.foldersRepository.find({
            where: {
                parent_folder_id,
            },
        });
        const treeIndex = `${parent_folder.tree_index}.`;
        const next = all_child_folders.length > 0 ? `${all_child_folders.length + 1}` : 1;
        if (!user)
            throw new common_1.NotFoundException('user not found');
        const new_folder = await this.foldersRepository.save({
            name,
            parent_folder_id,
            tree_index: treeIndex + next,
            users: [user],
        });
        const new_folder_1 = {
            ...new_folder,
            folder_name: new_folder.name,
            folder_parent_folder_id: new_folder.parent_folder_id,
            folder_tree_index: new_folder.tree_index,
            folder_createdAt: new_folder.createdAt,
            folder_id: new_folder.id,
        };
        const query = this.foldersRepository
            .createQueryBuilder('folder')
            .leftJoinAndSelect('folder.users', 'user')
            .where('user.id = :userId', { userId: user.id });
        if (parent_folder_id) {
            query.andWhere('folder.parent_folder_id = :parent_folder_id', {
                parent_folder_id,
            });
        }
        else {
            query.andWhere('folder.parent_folder_id IS NULL');
        }
        const data = await query.getMany();
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(folder_entity_1.Folder)),
    __param(1, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __param(2, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], FoldersService);
//# sourceMappingURL=folders.service.js.map