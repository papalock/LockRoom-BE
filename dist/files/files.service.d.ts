import { User } from '../users/entities/user.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { FilesPermissionsService } from 'src/files-permissions/file-permissions.service';
import { GroupFilesPermissionsService } from 'src/group-files-permissions/group-files-permissions.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { FoldersService } from 'src/folders/folders.service';
export declare class FilesService {
    private readonly foldersRepository;
    private readonly fileRepository;
    private readonly userRepository;
    private readonly fpService;
    private readonly folderService;
    private readonly gfpService;
    private readonly orgService;
    constructor(foldersRepository: Repository<Folder>, fileRepository: Repository<File>, userRepository: Repository<User>, fpService: FilesPermissionsService, folderService: FoldersService, gfpService: GroupFilesPermissionsService, orgService: OrganizationsService);
    addFileToAFolder(name: string, folder_id: string, user_id: string, organization_id: string, mime_type: string, size: number, extension: string, file_uploaded_name: string): Promise<{
        file_permissions: ({
            file: any;
            permission: {
                type: string;
                status: boolean;
            } & import("../permission/entities/permission.entity").Permission;
        } & import("../files-permissions/entities/files-permissions.entity").FilesPermissions)[];
        saved_file: File;
        new_group_files_permissions: ({
            group: import("../groups/entities/group.entity").Group;
            file_permission: any;
        } & import("../group-files-permissions/entities/group-files-permissions.entity").GroupFilesPermissions)[];
    }>;
    getAllFilesByOrganization(organization_id: string): Promise<File[]>;
    getFilesWithGroupPermissions(organization_id: string): Promise<void>;
    findOne(id: string): Promise<File>;
    buildFolderFileStructure(folder: Folder): Promise<{
        name: string;
        id: string;
        type: string;
        index: string;
        children: any[];
    }>;
    getFoldersAndFilesByOrganizationId(organization_id: string, parent_folder_id: string): Promise<any[]>;
    getAllFilesByOrg(organization_id: string, parent_folder_id: string): Promise<{
        name: string;
        id: string;
        type: string;
        index: string;
        children: any[];
    }>;
    dragAndDropFiles(organization_id: string, parent_folder_id: string, user_id: string, files_data: any[]): Promise<any[]>;
    dragAndDropFilesOneLevel(organization_id: string, parent_folder_id: string, folder_name: string, user_id: string, files: any[]): Promise<any[]>;
    private generatePaths;
    private ensureFolderPathExists;
    updateFileNameAndBucketUrlDragAndDrop(file_id: string, file_uploaded_name: string): Promise<File>;
}
