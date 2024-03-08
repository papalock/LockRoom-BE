import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/create-invite.dto';
export declare class InvitesController {
    private readonly invitesService;
    constructor(invitesService: InvitesService);
    create(createInviteDto: CreateInviteDto): string;
    findInvitesBySenderId(sender_id: string): Promise<import("./entities/invite.entity").Invite[]>;
    getEmailByToken(jwt_token: string): Promise<{
        email: string;
        organization_id: string;
    }>;
    addInvitedUser(first_name: string, last_name: string, email: string, password: string, phone_number: string, jwt_token: string): Promise<{
        status: boolean;
    }>;
    findAll(): Promise<void>;
}
