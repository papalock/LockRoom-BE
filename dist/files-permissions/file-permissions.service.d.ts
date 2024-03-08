import { Repository } from 'typeorm';
import { FilesPermissions } from './entities/files-permissions.entity';
import { PermissionService } from 'src/permission/permission.service';
export declare class FilesPermissionsService {
    private readonly filePermRepo;
    private readonly permissionService;
    constructor(filePermRepo: Repository<FilesPermissions>, permissionService: PermissionService);
    createFilePermissions(file: any): Promise<({
        file: any;
        permission: {
            type: string;
            status: boolean;
        } & import("../permission/entities/permission.entity").Permission;
    } & FilesPermissions)[]>;
    findFilePermissiosn(file_id: any): Promise<FilesPermissions[]>;
}
