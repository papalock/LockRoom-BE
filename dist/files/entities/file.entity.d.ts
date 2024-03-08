import { User } from '../../users/entities/user.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { FilesPermissions } from 'src/files-permissions/entities/files-permissions.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
export declare class File {
    id: string;
    name: string;
    folder: Folder;
    is_deleted: boolean;
    mime_type: string;
    size_bytes: number;
    tree_index: string;
    bucket_url: string;
    user: User;
    FilesPermissions: FilesPermissions[];
    organization: Organization;
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
