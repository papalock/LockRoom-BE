import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Folder } from 'src/folders/entities/folder.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Invite } from 'src/invites/entities/invite.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { AuditLogsSerivce } from 'src/audit-logs/audit-logs.service';
export declare class UsersService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly auditService;
    private readonly folderRepository;
    private readonly groupsRepository;
    private readonly orgRepository;
    private readonly inviteRepository;
    constructor(userRepository: Repository<User>, jwtService: JwtService, auditService: AuditLogsSerivce, folderRepository: Repository<Folder>, groupsRepository: Repository<Group>, orgRepository: Repository<Organization>, inviteRepository: Repository<Invite>);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            organization_created: Organization;
            id: string;
            first_name: string;
            last_name: string;
            full_name: string;
            email: string;
            is_email_verified: boolean;
            is_session_active: boolean;
            role: string;
            sso_login: boolean;
            sso_type: string;
            display_picture_url: string;
            password: string;
            phone_number: string;
            generated_otp: string;
            organizations_added_in: Organization[];
            createdGroups: Group[];
            folders: Folder[];
            groups: Group[];
            sent_invites: Invite[];
            files: import("../files/entities/file.entity").File[];
            audit_log: import("../audit-logs/entities/audit-logs.entities").AuditLogs[];
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
        files_count: number;
        id: string;
        organizations: Organization[];
    }>;
    loginUser(email: string, password: string): Promise<{
        access_token: string;
        is_phone_number_verified: boolean;
        id: string;
        user: User;
        organizations: Organization[];
    }>;
    loginWithGoogle(jwt_token: string): Promise<{
        access_token: string;
        is_phone_number_verified: boolean;
        folders: Folder[];
        files_count: number;
        sub_folder_count: any[];
        id: string;
        user: User;
        organizations: Organization[];
    } | {
        access_token: string;
        folders: ({
            name: string;
            parent_folder_id: any;
            tree_index: string;
            users: User[];
            organization: Organization;
            absolute_path: string;
        } & Folder)[];
        files_count: number;
        id: string;
        sub_folder_count: any[];
        user: {
            organization_created: Organization;
            id: string;
            first_name: string;
            last_name: string;
            full_name: string;
            email: string;
            is_email_verified: boolean;
            is_session_active: boolean;
            role: string;
            sso_login: boolean;
            sso_type: string;
            display_picture_url: string;
            password: string;
            phone_number: string;
            generated_otp: string;
            organizations_added_in: Organization[];
            createdGroups: Group[];
            folders: Folder[];
            groups: Group[];
            sent_invites: Invite[];
            files: import("../files/entities/file.entity").File[];
            audit_log: import("../audit-logs/entities/audit-logs.entities").AuditLogs[];
            createdAt: Date;
            updatedAt: Date;
        };
        organizations: Organization[];
        is_phone_number_verified?: undefined;
    }>;
    verifyEmail(user_id: string): Promise<User>;
    getUserByToken(user_id: string): Promise<{
        findUser: User;
        organizations: any[];
    }>;
    findOne(where: any): Promise<User>;
    getAllGroups(user_id: string): Promise<Group[]>;
    findAll(): Promise<User[]>;
    truncateUserTable(): Promise<{
        success: boolean;
    }>;
}
