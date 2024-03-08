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
exports.InvitesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const invite_entity_1 = require("../invites/entities/invite.entity");
const group_entity_1 = require("../groups/entities/group.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const email_templates_1 = require("../utils/email.templates");
const email_utils_1 = require("../utils/email.utils");
const groups_service_1 = require("../groups/groups.service");
let InvitesService = class InvitesService {
    constructor(inviteRepository, userRepository, groupRepository, orgRepository, jwtService, groupService) {
        this.inviteRepository = inviteRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.orgRepository = orgRepository;
        this.jwtService = jwtService;
        this.groupService = groupService;
    }
    create(createInviteDto) {
        return 'This action adds a new invite';
    }
    async findAll() {
        await this.inviteRepository.find();
    }
    async findBySenderId(sender_id) {
        return this.inviteRepository
            .createQueryBuilder('invite')
            .leftJoinAndSelect('invite.sender', 'sender')
            .where('sender.id = :userId', { userId: sender_id })
            .getMany();
    }
    async sendInvitesBySenderId(sender_id, emails, group_id, organization_id) {
        const findUser = await this.userRepository.findOne({
            where: {
                id: sender_id,
            },
        });
        const findGroup = await this.groupRepository.findOne({
            where: {
                id: group_id,
            },
        });
        const findOrg = await this.orgRepository.findOne({
            relations: ['users'],
            where: {
                id: organization_id,
            },
        });
        const invites = emails.map((email) => {
            return {
                sender: findUser,
                sent_to: email,
                group: findGroup,
                organization: findOrg,
                status: 'pending',
            };
        });
        const invitesDB = await this.inviteRepository.save(invites);
        return { user: findUser, invites: invitesDB };
    }
    async getEmailByToken(jwt_token) {
        try {
            const resp = await this.jwtService.verify(jwt_token, {
                secret: process.env.JWT_SECRET,
            });
            if (resp) {
                const findInvite = await this.inviteRepository.findOne({
                    relations: ['organization'],
                    where: {
                        id: resp.invite_id,
                    },
                });
                if (!findInvite)
                    throw new common_1.NotFoundException('user not found');
                console.log();
                return {
                    email: findInvite.sent_to,
                    organization_id: findInvite.organization.id,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async addInvitedUser(email, password, first_name, last_name, phone_number, jwt_token) {
        try {
            const find_user = await this.userRepository.findOne({
                relations: ['organizations_added_in'],
                where: {
                    email: email,
                },
            });
            if (find_user) {
                throw new common_1.ConflictException('User Already Exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;
            const full_name = `${first_name} ${last_name}`;
            const resp = await this.jwtService.verify(jwt_token, {
                secret: process.env.JWT_INVITE_SECRET,
            });
            const invite = await this.inviteRepository.findOne({
                relations: ['organization', 'group'],
                where: {
                    id: resp.invite_id,
                },
            });
            const find_org = await this.orgRepository.findOne({
                relations: ['users'],
                where: {
                    id: invite.organization.id,
                },
            });
            const role = 'guest';
            invite.status = 'accepted';
            await this.inviteRepository.save(invite);
            const find_group = await this.groupRepository.findOne({
                relations: ['users'],
                where: {
                    id: invite.group.id,
                },
            });
            const new_user = this.userRepository.create({
                email,
                password,
                first_name,
                last_name,
                role,
                phone_number,
                full_name,
                organizations_added_in: [find_org],
                groups: [find_group],
            });
            await this.groupRepository.save(find_group);
            const saved_user = await this.userRepository.save(new_user);
            console.log('saved users', saved_user);
            return {
                status: true,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message || 'failed to create user');
        }
    }
    async sendInvitesNew(sender_id, emails, group_id, organization_id) {
        try {
            console.log('SEND INVITES TO', emails, 'BY', sender_id);
            if (!sender_id)
                throw new common_1.UnauthorizedException('Sender Id is Missing');
            let new_users = [];
            const senderUser = await this.userRepository.findOne({
                where: { id: sender_id },
            });
            emails.map(async (email) => {
                const invitedUserAlreadyExists = await this.userRepository.findOne({
                    where: { email },
                });
                if (invitedUserAlreadyExists) {
                    console.log('in user already exists');
                    return await this.groupService.addUserToAGroup(group_id, invitedUserAlreadyExists.id, senderUser.first_name + ' ' + senderUser.last_name);
                }
                console.log('out user already exists');
                new_users.push(email);
            });
            const { invites } = await this.sendInvitesBySenderId(sender_id, new_users, group_id, organization_id);
            if (invites.length > 0) {
                const sendEmails = invites.map(async (invite) => {
                    const payload = { invite_id: invite.id };
                    const access_token = this.jwtService.sign(payload, {
                        secret: process.env.JWT_INVITE_SECRET,
                    });
                    const link = `${process.env.FE_HOST}/authentication/signup?confirm=${access_token}`;
                    const mail = {
                        to: invite.sent_to,
                        subject: 'Invited to LockRoom',
                        from: String(process.env.VERIFIED_SENDER_EMAIL) ||
                            'waleed@lockroom.com',
                        text: 'Hello',
                        html: (0, email_templates_1.inviteTemplate)(senderUser.first_name, link, 'Create Account'),
                    };
                    return await (0, email_utils_1.sendEmailUtil)(mail);
                });
                const result = await Promise.all(sendEmails);
                const group_users = await this.groupService.findAllUsersInGroup(group_id);
                if (result.length > 0) {
                    return {
                        data: result,
                        message: 'Emails Sent Successfully',
                        invites,
                        group_users,
                    };
                }
            }
            if (new_users.length == 0) {
                const group_users = await this.groupService.findAllUsersInGroup(group_id);
                return { group_users };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.InvitesService = InvitesService;
exports.InvitesService = InvitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invite_entity_1.Invite)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(3, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        groups_service_1.GroupsService])
], InvitesService);
//# sourceMappingURL=invites.service.js.map