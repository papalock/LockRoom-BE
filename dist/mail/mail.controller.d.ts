import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { GroupsService } from 'src/groups/groups.service';
import { InvitesService } from 'src/invites/invites.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { UsersService } from 'src/users/users.service';
export declare class MailController {
    private readonly emailService;
    private readonly inviteService;
    private readonly userService;
    private readonly groupService;
    private readonly orgService;
    private readonly jwtService;
    constructor(emailService: EmailService, inviteService: InvitesService, userService: UsersService, groupService: GroupsService, orgService: OrganizationsService, jwtService: JwtService);
    sendEmail(emails: string[], sender_id: string, group_id: string, organization_id: string): Promise<{
        data: [import("@sendgrid/mail").ClientResponse, {}][];
        message: string;
        invites: ({
            sender: import("../users/entities/user.entity").User;
            sent_to: string;
            group: import("../groups/entities/group.entity").Group;
            organization: import("../organizations/entities/organization.entity").Organization;
            status: string;
        } & import("../invites/entities/invite.entity").Invite)[];
        group_users: import("../groups/entities/group.entity").Group;
    } | {
        group_users: import("../groups/entities/group.entity").Group;
        data?: undefined;
        message?: undefined;
        invites?: undefined;
    }>;
}
