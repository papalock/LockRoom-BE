import { User } from '../../users/entities/user.entity';
import { Invite } from 'src/invites/entities/invite.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { GroupFilesPermissions } from 'src/group-files-permissions/entities/group-files-permissions.entity';
export declare class Group {
    id: string;
    name: string;
    createdBy: User;
    users: User[];
    invites: Invite[];
    organization: Organization;
    group_files_permissions: GroupFilesPermissions[];
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
