import { User } from '../../users/entities/user.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { FilesPermissions } from 'src/files-permissions/entities/files-permissions.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { AuditLogs } from 'src/audit-logs/entities/audit-logs.entities';
export declare class File {
    id: string;
    name: string;
    file_uploaded_name: string;
    original_name: string;
    folder: Folder;
    is_deleted: boolean;
    mime_type: string;
    size_bytes: number;
    tree_index: string;
    bucket_url: string;
    extension: string;
    user: User;
    FilesPermissions: FilesPermissions[];
    organization: Organization;
    audit_log: AuditLogs;
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
