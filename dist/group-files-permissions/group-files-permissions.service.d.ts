import { Repository } from 'typeorm';
import { GroupFilesPermissions } from './entities/group-files-permissions.entity';
import { Group } from 'src/groups/entities/group.entity';
export declare class GroupFilesPermissionsService {
    private readonly groupFilePermRepo;
    private readonly groupsRepository;
    constructor(groupFilePermRepo: Repository<GroupFilesPermissions>, groupsRepository: Repository<Group>);
    createGroupFilePermissionsFoAllGroups(organization_id: string, files_permissions: any[]): Promise<({
        group: Group;
        file_permission: any;
    } & GroupFilesPermissions)[]>;
    createGroupFilePermissionsForOneGroup(group: any, files_permissions: any[]): Promise<({
        group: any;
        file_permission: any;
    } & GroupFilesPermissions)[]>;
    updateGroupFilePermissions(group_id: string, file_permission_id: number, status: boolean): Promise<void>;
    getGroupFilesPermissiosnByFileIds(file_ids: string[]): Promise<GroupFilesPermissions[]>;
}
