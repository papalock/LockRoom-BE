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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email/email.service");
const groups_service_1 = require("../groups/groups.service");
const invites_service_1 = require("../invites/invites.service");
const organizations_service_1 = require("../organizations/organizations.service");
const users_service_1 = require("../users/users.service");
const email_templates_1 = require("../utils/email.templates");
let MailController = class MailController {
    constructor(emailService, inviteService, userService, groupService, orgService, jwtService) {
        this.emailService = emailService;
        this.inviteService = inviteService;
        this.userService = userService;
        this.groupService = groupService;
        this.orgService = orgService;
        this.jwtService = jwtService;
    }
    async sendEmail(emails, sender_id, group_id, organization_id) {
        try {
            console.log('SEND INVITES TO', emails, 'BY', sender_id);
            if (!sender_id)
                throw new common_1.UnauthorizedException('Sender Id is Missing');
            let new_users = [];
            const senderUser = await this.userService.findOne({ id: sender_id });
            emails.map(async (email) => {
                const invitedUserAlreadyExists = await this.userService.findOne({
                    email,
                });
                if (invitedUserAlreadyExists) {
                    if (invitedUserAlreadyExists.role == 'admin')
                        return;
                    if (invitedUserAlreadyExists?.organization_created?.id == organization_id)
                        return;
                    console.log('in user already exists');
                    return await this.groupService.addUserToAGroup(group_id, invitedUserAlreadyExists.id, senderUser.first_name + ' ' + senderUser.last_name);
                }
                new_users.push(email);
            });
            const { invites } = await this.inviteService.sendInvitesBySenderId(sender_id, new_users, group_id, organization_id);
            if (invites.length > 0) {
                const sendEmails = invites.map((invite) => {
                    const payload = { invite_id: invite.id };
                    const access_token = this.jwtService.sign(payload, {
                        secret: process.env.JWT_INVITE_SECRET,
                    });
                    console.log(access_token, "access_token");
                    const link = `${process.env.FE_HOST}/authentication/signup?confirm=${access_token}`;
                    const mail = {
                        to: invite.sent_to,
                        subject: 'Invited to LockRoom',
                        from: String(process.env.VERIFIED_SENDER_EMAIL) ||
                            'waleed@lockroom.com',
                        text: 'Hello',
                        html: (0, email_templates_1.inviteTemplate)(senderUser.first_name, link, 'Create Account'),
                    };
                    return this.emailService.send(mail);
                });
                const result = await Promise.all(sendEmails);
                const group_users = await this.groupService.findAllUsersInGroup(group_id);
                if (result.length > 0) {
                    return { data: result, message: 'Emails Sent Successfully', invites, group_users };
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
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)('send-invites'),
    __param(0, (0, common_1.Body)('emails')),
    __param(1, (0, common_1.Body)('sender_id')),
    __param(2, (0, common_1.Body)('group_id')),
    __param(3, (0, common_1.Body)('organization_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, String, String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendEmail", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        invites_service_1.InvitesService,
        users_service_1.UsersService,
        groups_service_1.GroupsService,
        organizations_service_1.OrganizationsService,
        jwt_1.JwtService])
], MailController);
//# sourceMappingURL=mail.controller.js.map