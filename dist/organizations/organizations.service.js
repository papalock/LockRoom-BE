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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const organization_entity_1 = require("./entities/organization.entity");
const invite_entity_1 = require("../invites/entities/invite.entity");
let OrganizationsService = class OrganizationsService {
    constructor(orgRepository, inviteRepository) {
        this.orgRepository = orgRepository;
        this.inviteRepository = inviteRepository;
    }
    create(createOrganizationDto) {
        return 'This action adds a new organization';
    }
    findAll() {
        return `This action returns all organizations`;
    }
    async findOne(id) {
        return await this.orgRepository.findOne({
            relations: ['groups'],
            where: {
                id,
            },
        });
    }
    async getUsersByOrganization(organization_id) {
        try {
            const find_org = await this.orgRepository.findOne({
                relations: ['creator', 'users', 'groups.users'],
                where: [
                    {
                        id: organization_id,
                    },
                ],
            });
            const find_invites = await this.inviteRepository.find({
                relations: ['sender'],
                where: {
                    organization: {
                        id: organization_id,
                    },
                    status: 'pending'
                },
            });
            if (!find_org)
                throw new common_1.NotFoundException('organization not found');
            console.log(find_invites.filter(item => item.status == 'pending'), 'invites');
            return {
                organization: find_org,
                invites: find_invites.filter(item => item.status == 'pending'),
            };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async getUsersByOrganizationAndGroup(organization_id, group_id) {
        try {
            console.log(organization_id, group_id);
            const find_org = await this.orgRepository.findOne({
                relations: ['creator', 'groups.users'],
                where: {
                    id: organization_id,
                    groups: {
                        id: group_id,
                    },
                },
            });
            if (!find_org)
                throw new common_1.NotFoundException('organization not found');
            const find_invites = await this.inviteRepository.find({
                relations: ['sender'],
                where: {
                    organization: {
                        id: organization_id,
                    },
                    group: {
                        id: group_id
                    },
                    status: 'pending'
                },
            });
            return {
                organization: { ...find_org, group_name: find_org.groups[0].name },
                invites: find_invites,
            };
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    update(id, updateOrganizationDto) {
        return `This action updates a #${id} organization`;
    }
    remove(id) {
        return `This action removes a #${id} organization`;
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(organization_entity_1.Organization)),
    __param(1, (0, typeorm_2.InjectRepository)(invite_entity_1.Invite)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map