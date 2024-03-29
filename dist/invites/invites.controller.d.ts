import { InvitesService } from './invites.service';
export declare class InvitesController {
    private readonly invitesService;
    constructor(invitesService: InvitesService);
    findInvitesBySenderId(request: any): Promise<import("./entities/invite.entity").Invite[]>;
    getEmailByToken(jwt_token: string): Promise<{
        email: string;
        organization_id: string;
    }>;
    addInvitedUser(first_name: string, last_name: string, email: string, password: string, phone_number: string, jwt_token: string): Promise<{
        status: boolean;
    }>;
}
