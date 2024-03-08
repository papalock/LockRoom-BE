import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { User } from '../users/entities/user.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { FilesPermissionsService } from 'src/files-permissions/file-permissions.service';
import { GroupFilesPermissionsService } from 'src/group-files-permissions/group-files-permissions.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
export declare class FilesService {
    private readonly foldersRepository;
    private readonly fileRepository;
    private readonly userRepository;
    private readonly fpService;
    private readonly gfpService;
    private readonly orgService;
    constructor(foldersRepository: Repository<Folder>, fileRepository: Repository<File>, userRepository: Repository<User>, fpService: FilesPermissionsService, gfpService: GroupFilesPermissionsService, orgService: OrganizationsService);
    create(createFileDto: CreateFileDto): string;
    addFileToAFolder(name: string, folder_id: string, user_id: string, organization_id: string, mime_type: string): Promise<{
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
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFileDto: UpdateFileDto): string;
    remove(id: number): string;
}
