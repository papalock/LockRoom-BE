import { User } from '../../users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
export declare class Invite {
    id: string;
    sender: User;
    group: Group;
    organization: Organization;
    sent_to: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
