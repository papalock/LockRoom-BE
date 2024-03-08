import { Permission } from '../../permission/entities/permission.entity';
import { File } from '../../files/entities/file.entity';
import { GroupFilesPermissions } from 'src/group-files-permissions/entities/group-files-permissions.entity';
export declare class FilesPermissions {
    id: number;
    file: File;
    permission: Permission;
    group_files_permissions: GroupFilesPermissions[];
    addId(): void;
}
