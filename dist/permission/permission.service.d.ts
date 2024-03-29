import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
export declare class PermissionService {
    private readonly permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    createNewPermissions(): Promise<({
        type: string;
        status: boolean;
    } & Permission)[]>;
}
