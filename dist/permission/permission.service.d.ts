import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
export declare class PermissionService {
    private readonly permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    create(createPermissionDto: CreatePermissionDto): string;
    createNewPermissions(): Promise<({
        type: string;
        status: boolean;
    } & Permission)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePermissionDto: UpdatePermissionDto): string;
    remove(id: number): string;
}
