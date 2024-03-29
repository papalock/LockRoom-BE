import { User } from '../../users/entities/user.entity';
import { File } from 'src/files/entities/file.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
export declare class Folder {
    id: string;
    name: string;
    parentFolder: Folder;
    parent_folder_id: string;
    is_deleted: boolean;
    tree_index: string;
    absolute_path: string;
    sub_folders: Folder[];
    files: File[];
    users: User[];
    organization: Organization;
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
