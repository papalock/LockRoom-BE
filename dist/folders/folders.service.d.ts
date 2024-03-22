import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { UsersService } from '../users/users.service';
import { FilesPermissions } from 'src/files-permissions/entities/files-permissions.entity';
import { GroupFilesPermissions } from 'src/group-files-permissions/entities/group-files-permissions.entity';
import { File } from 'src/files/entities/file.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Group } from 'src/groups/entities/group.entity';
export declare class FoldersService {
    private readonly foldersRepository;
    private readonly fileRepository;
    private readonly orgRepository;
    private readonly groupsRepository;
    private readonly fpRepository;
    private readonly gfpRepository;
    private readonly userService;
    constructor(foldersRepository: Repository<Folder>, fileRepository: Repository<File>, orgRepository: Repository<Organization>, groupsRepository: Repository<Group>, fpRepository: Repository<FilesPermissions>, gfpRepository: Repository<GroupFilesPermissions>, userService: UsersService);
    create(name: string, user_id: string, organization_id: string, parent_folder_id?: string): Promise<{
        new_folder: {
            folder_name: string;
            folder_parent_folder_id: string;
            folder_tree_index: string;
            folder_createdAt: Date;
            folder_id: string;
            name: string;
            parent_folder_id: string;
            tree_index: string;
            users: import("../users/entities/user.entity").User[];
            organization: Organization;
            id: string;
            parentFolder: Folder;
            is_deleted: boolean;
            sub_folders: Folder[];
            files: File[];
            createdAt: Date;
            updatedAt: Date;
        };
        files_count: number;
        parent_folder: Folder;
    }>;
    findAll(): Promise<void>;
    findAllByOrganization(organization_id: string, user_id: string): Promise<{
        sub_folder_count: any[];
    }>;
    findAllByUserId(userId: string): Promise<void>;
    findOne(id: number): string;
    update(prev_name: string, new_name: string, parent_folder_id?: string): Promise<void>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
    createFolderWithDefaultPermissions(name: string, sub: string, parent_folder_id?: string): Promise<void>;
}
