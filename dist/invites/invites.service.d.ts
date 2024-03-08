import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Invite } from '../invites/entities/invite.entity';
import { Group } from 'src/groups/entities/group.entity';
import { JwtService } from '@nestjs/jwt';
import { Organization } from 'src/organizations/entities/organization.entity';
import { GroupsService } from 'src/groups/groups.service';
export declare class InvitesService {
    private readonly inviteRepository;
    private readonly userRepository;
    private readonly groupRepository;
    private readonly orgRepository;
    private readonly jwtService;
    private readonly groupService;
    constructor(inviteRepository: Repository<Invite>, userRepository: Repository<User>, groupRepository: Repository<Group>, orgRepository: Repository<Organization>, jwtService: JwtService, groupService: GroupsService);
    create(createInviteDto: any): string;
    findAll(): Promise<void>;
    findBySenderId(sender_id: string): Promise<Invite[]>;
    sendInvitesBySenderId(sender_id: string, emails: string[], group_id: string, organization_id: string): Promise<{
        user: User;
        invites: ({
            sender: User;
            sent_to: string;
            group: Group;
            organization: Organization;
            status: string;
        } & Invite)[];
    }>;
    getEmailByToken(jwt_token: string): Promise<{
        email: string;
        organization_id: string;
    }>;
    addInvitedUser(email: string, password: string, first_name: string, last_name: string, phone_number: string, jwt_token: string): Promise<{
        status: boolean;
    }>;
    sendInvitesNew(sender_id: string, emails: string[], group_id: string, organization_id: string): Promise<{
        data: [import("@sendgrid/mail").ClientResponse, {}][];
        message: string;
        invites: ({
            sender: User;
            sent_to: string;
            group: Group;
            organization: Organization;
            status: string;
        } & Invite)[];
        group_users: Group;
    } | {
        group_users: Group;
        data?: undefined;
        message?: undefined;
        invites?: undefined;
    }>;
}
