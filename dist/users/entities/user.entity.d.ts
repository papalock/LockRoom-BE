import { Folder } from '../../folders/entities/folder.entity';
import { Invite } from '../../invites/entities/invite.entity';
import { Group } from '../..//groups/entities/group.entity';
import { File } from 'src/files/entities/file.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { AuditLogs } from 'src/audit-logs/entities/audit-logs.entities';
export declare class User {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    is_email_verified: boolean;
    is_session_active: boolean;
    role: string;
    sso_login: boolean;
    sso_type: string;
    display_picture_url: string;
    password: string;
    phone_number: string;
    generated_otp: string;
    organization_created: Organization;
    organizations_added_in: Organization[];
    createdGroups: Group[];
    folders: Folder[];
    groups: Group[];
    sent_invites: Invite[];
    files: File[];
    audit_log: AuditLogs[];
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
