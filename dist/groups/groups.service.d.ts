import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { FilesService } from 'src/files/files.service';
import { FilesPermissions } from 'src/files-permissions/entities/files-permissions.entity';
import { GroupFilesPermissionsService } from 'src/group-files-permissions/group-files-permissions.service';
export declare class GroupsService {
    private readonly groupsRepository;
    private readonly userRepository;
    private readonly orgRepository;
    private readonly fpRepository;
    private readonly fileService;
    private readonly gfpService;
    constructor(groupsRepository: Repository<Group>, userRepository: Repository<User>, orgRepository: Repository<Organization>, fpRepository: Repository<FilesPermissions>, fileService: FilesService, gfpService: GroupFilesPermissionsService);
    create(name: string, user_id: string, organization_id: string): Promise<Group>;
    addUserToAGroup(groupId: string, user_id: string, sender_name: string): Promise<Group>;
    removeUserFromGroup(groupId: string, user_id: string): Promise<Group>;
    findAll(): Promise<Group[]>;
    findAllUsersInGroup(id: string): Promise<Group>;
    findOne(id: string): Promise<Group>;
    getGroupsByOrganization(organization_id: string, user_id: string): Promise<any[]>;
    getGroupsByOrg(organization_id: string): Promise<Group[]>;
    update(id: number): string;
    remove(id: number): string;
}
