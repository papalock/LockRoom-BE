import { FilesPermissions } from 'src/files-permissions/entities/files-permissions.entity';
import { Group } from 'src/groups/entities/group.entity';
export declare class GroupFilesPermissions {
    id: number;
    group: Group;
    file_permission: FilesPermissions;
    addId(): void;
}
