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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const group_entity_1 = require("./entities/group.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const email_utils_1 = require("../utils/email.utils");
const email_templates_1 = require("../utils/email.templates");
const files_service_1 = require("../files/files.service");
const files_permissions_entity_1 = require("../files-permissions/entities/files-permissions.entity");
const typeorm_3 = require("typeorm");
const group_files_permissions_service_1 = require("../group-files-permissions/group-files-permissions.service");
let GroupsService = class GroupsService {
    constructor(groupsRepository, userRepository, orgRepository, fpRepository, fileService, gfpService) {
        this.groupsRepository = groupsRepository;
        this.userRepository = userRepository;
        this.orgRepository = orgRepository;
        this.fpRepository = fpRepository;
        this.fileService = fileService;
        this.gfpService = gfpService;
    }
    async create(name, user_id, organization_id) {
        try {
            if (!name || !user_id || !organization_id)
                throw new common_1.NotFoundException('Missing Fields');
            const group = await this.groupsRepository.findOne({
                where: {
                    name: name,
                },
            });
            if (group)
                throw new common_1.ConflictException('group already exists with same name');
            const find_user = await this.userRepository.findOne({
                where: {
                    id: user_id,
                },
            });
            if (!find_user)
                throw new common_1.NotFoundException('user not found');
            const findOrg = await this.orgRepository.findOne({
                where: {
                    id: organization_id,
                },
            });
            const new_group = this.groupsRepository.create({
                name,
                createdBy: find_user,
                organization: findOrg,
            });
            const find_files = await this.fileService.getAllFilesByOrganization(organization_id);
            const files_ids = find_files.map((files) => files.id);
            const find_file_permissions = await this.fpRepository.find({
                where: {
                    file: (0, typeorm_3.In)(files_ids),
                },
            });
            const saved_group = await this.groupsRepository.save(new_group);
            await this.gfpService.createGroupFilePermissionsForOneGroup(saved_group, find_file_permissions);
            return saved_group;
        }
        catch (error) {
            console.log(error, 'err');
            throw Error(error);
        }
    }
    async addUserToAGroup(group_id, user_id, sender_name) {
        try {
            if (!group_id || !user_id || !sender_name)
                throw new common_1.NotFoundException('Missing Fields');
            const find_group = await this.groupsRepository.findOne({
                relations: ['users'],
                where: {
                    id: group_id,
                },
            });
            const find_org = await this.orgRepository.findOne({
                relations: ['users'],
                where: {
                    groups: {
                        id: group_id,
                    },
                },
            });
            if (!find_group)
                throw new common_1.NotFoundException('group not found');
            const find_user = await this.userRepository.findOne({
                relations: ['organizations_added_in'],
                where: {
                    id: user_id,
                },
            });
            if (!find_user)
                throw new common_1.NotFoundException('user not found');
            const userExistsInGroup = find_group.users.some((existingUser) => existingUser.id === find_user.id);
            if (userExistsInGroup)
                return;
            const link = `${process.env.FE_HOST}/dashboard/${find_org.id}`;
            const mail = {
                to: find_user.email,
                subject: 'Invited to LockRoom',
                from: String(process.env.VERIFIED_SENDER_EMAIL) || 'waleed@lockroom.com',
                text: 'Hello',
                html: (0, email_templates_1.inviteTemplate)(sender_name, link, 'View Organization'),
            };
            find_group.users.push(find_user);
            find_user.organizations_added_in.push(find_org);
            await this.userRepository.save(find_user);
            await (0, email_utils_1.sendEmailUtil)(mail);
            return await this.groupsRepository.save(find_group);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async removeUserFromGroup(group_id, user_id) {
        const group = await this.groupsRepository.findOne({
            relations: ['users'],
            where: {
                id: group_id,
            },
        });
        const user = await this.userRepository.findOne({
            where: {
                id: user_id,
            },
        });
        const userIndex = group.users.findIndex((existingUser) => existingUser.id === user.id);
        if (userIndex == -1)
            throw new common_1.ConflictException('user not in the group');
        group.users.splice(userIndex, 1);
        return await this.groupsRepository.save(group);
    }
    async findAll() {
        return await this.groupsRepository.find();
    }
    async findAllUsersInGroup(id) {
        try {
            return await this.groupsRepository.findOne({
                relations: ['users'],
                where: {
                    id,
                },
            });
        }
        catch (error) { }
    }
    async findOne(id) {
        try {
            return await this.groupsRepository.findOne({
                where: {
                    id,
                },
                relations: ['users'],
            });
        }
        catch (error) { }
    }
    async getGroupsByOrganization(organization_id, user_id) {
        try {
            if (!organization_id || !user_id)
                throw new common_1.NotFoundException('Missing Fields');
            const groups_result = [];
            const find_groups = await this.groupsRepository.find({
                relations: ['users', 'organization.creator'],
                where: {
                    organization: {
                        id: organization_id,
                    },
                },
            });
            find_groups.map((group) => {
                if (group.organization.creator &&
                    group.organization.creator.id == user_id) {
                    groups_result.push(group);
                }
                else if (group.users.find((user) => user.id == user_id)) {
                    groups_result.push(group);
                }
            });
            return groups_result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        }
        catch (error) {
            console.log(error, 'in group org');
        }
    }
    async getGroupsByOrg(organization_id) {
        return this.groupsRepository.find({
            where: {
                organization: {
                    id: organization_id,
                },
            },
        });
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(3, (0, typeorm_1.InjectRepository)(files_permissions_entity_1.FilesPermissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        files_service_1.FilesService,
        group_files_permissions_service_1.GroupFilesPermissionsService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map