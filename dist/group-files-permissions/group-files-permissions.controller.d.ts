import { GroupFilesPermissionsService } from './group-files-permissions.service';
export declare class GroupFilesPermissionsController {
    private readonly grpupFilesPermissionsService;
    constructor(grpupFilesPermissionsService: GroupFilesPermissionsService);
    create(file_ids: string[], group_id: string, new_status: boolean, type: string): Promise<{
        update_permissions: import("typeorm").UpdateResult;
        message: string;
    } | {
        message: string;
        update_permissions?: undefined;
    }>;
}
