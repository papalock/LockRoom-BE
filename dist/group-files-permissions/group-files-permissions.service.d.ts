import { Repository } from 'typeorm';
import { GroupFilesPermissions } from './entities/group-files-permissions.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Permission } from 'src/permission/entities/permission.entity';
export declare class GroupFilesPermissionsService {
    private readonly groupFilePermRepo;
    private readonly groupsRepository;
    private readonly permissionRepository;
    constructor(groupFilePermRepo: Repository<GroupFilesPermissions>, groupsRepository: Repository<Group>, permissionRepository: Repository<Permission>);
    createGroupFilePermissionsFoAllGroups(organization_id: string, files_permissions: any[]): Promise<({
        group: Group;
        file_permission: any;
    } & GroupFilesPermissions)[]>;
    createGroupFilePermissionsForOneGroup(group: any, files_permissions: any[]): Promise<({
        group: any;
        file_permission: any;
    } & GroupFilesPermissions)[]>;
    updateGroupFilePermissions(group_id: string, file_permission_id: number, status: boolean): Promise<void>;
    newUpdateGroupFilePermissions(group_id: string, file_ids: string[], status: boolean, type: string): Promise<{
        update_permissions: import("typeorm").UpdateResult;
        message: string;
    } | {
        message: string;
        update_permissions?: undefined;
    }>;
    getGroupFilesPermissiosnByFileIds(file_ids: string[]): Promise<GroupFilesPermissions[]>;
}
