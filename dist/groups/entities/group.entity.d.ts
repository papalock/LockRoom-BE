import { User } from '../../users/entities/user.entity';
import { Invite } from 'src/invites/entities/invite.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { GroupFilesPermissions } from 'src/group-files-permissions/entities/group-files-permissions.entity';
import { AuditLogs } from 'src/audit-logs/entities/audit-logs.entities';
export declare class Group {
    id: string;
    name: string;
    createdBy: User;
    users: User[];
    invites: Invite[];
    organization: Organization;
    group_files_permissions: GroupFilesPermissions[];
    audit_log: AuditLogs[];
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
