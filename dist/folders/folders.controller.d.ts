import { FoldersService } from './folders.service';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    create(name: string, parent_folder_id: string, organization_id: string, request: any): Promise<{
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
            absolute_path: string;
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
    findAllByOrganization(organization_id: string, request: any): Promise<{
        sub_folder_count: any[];
    }>;
    rename(folder_id: string, new_name: string, parent_folder_id: string): Promise<import("@nestjs/common").ConflictException | import("typeorm").UpdateResult>;
    remove(folder_id: string): Promise<import("typeorm").UpdateResult>;
}
