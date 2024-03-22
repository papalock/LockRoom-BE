import { FoldersService } from './folders.service';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    create(name: string, user_id: string, parent_folder_id: string, organization_id: string): Promise<{
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
            organization: import("../organizations/entities/organization.entity").Organization;
            id: string;
            parentFolder: import("./entities/folder.entity").Folder;
            is_deleted: boolean;
            sub_folders: import("./entities/folder.entity").Folder[];
            files: import("../files/entities/file.entity").File[];
            createdAt: Date;
            updatedAt: Date;
        };
        files_count: number;
        parent_folder: import("./entities/folder.entity").Folder;
    }>;
    findAll(): Promise<void>;
    findAllByOrganization(organization_id: string, user_id: string): Promise<{
        sub_folder_count: any[];
    }>;
    findAllByUserId(id: string): Promise<void>;
    findOne(id: string): string;
    update(id: string, updateRepositoryDto: UpdateRepositoryDto): void;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
