import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, res: any): Promise<{
        access_token: string;
        id: string;
        user: {
            organization_created: import("../organizations/entities/organization.entity").Organization;
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
            organizations_added_in: import("../organizations/entities/organization.entity").Organization[];
            createdGroups: import("../groups/entities/group.entity").Group[];
            folders: import("../folders/entities/folder.entity").Folder[];
            groups: import("../groups/entities/group.entity").Group[];
            sent_invites: import("../invites/entities/invite.entity").Invite[];
            files: import("../files/entities/file.entity").File[];
            audit_log: import("../audit-logs/entities/audit-logs.entities").AuditLogs[];
            createdAt: Date;
            updatedAt: Date;
        };
        organizations: import("../organizations/entities/organization.entity").Organization[];
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        is_phone_number_verified: boolean;
        id: string;
        user: import("./entities/user.entity").User;
        organizations: import("../organizations/entities/organization.entity").Organization[];
    }>;
    findAllGroupsByUserId(request: any): Promise<import("../groups/entities/group.entity").Group[]>;
    verifyEmail(request: any): Promise<import("./entities/user.entity").User>;
    getUserByToken(request: any): Promise<{
        findUser: import("./entities/user.entity").User;
        organizations: any[];
    }>;
    deleteDB(): Promise<{
        success: boolean;
    }>;
    loginWithGmail(jwt_token: string): Promise<{
        access_token: string;
        is_phone_number_verified: boolean;
        folders: import("../folders/entities/folder.entity").Folder[];
        files_count: number;
        sub_folder_count: any[];
        id: string;
        user: import("./entities/user.entity").User;
        organizations: import("../organizations/entities/organization.entity").Organization[];
    } | {
        access_token: string;
        folders: ({
            name: string;
            parent_folder_id: any;
            tree_index: string;
            users: import("./entities/user.entity").User[];
            organization: import("../organizations/entities/organization.entity").Organization;
            absolute_path: string;
        } & import("../folders/entities/folder.entity").Folder)[];
        files_count: number;
        id: string;
        sub_folder_count: any[];
        user: {
            organization_created: import("../organizations/entities/organization.entity").Organization;
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
            organizations_added_in: import("../organizations/entities/organization.entity").Organization[];
            createdGroups: import("../groups/entities/group.entity").Group[];
            folders: import("../folders/entities/folder.entity").Folder[];
            groups: import("../groups/entities/group.entity").Group[];
            sent_invites: import("../invites/entities/invite.entity").Invite[];
            files: import("../files/entities/file.entity").File[];
            audit_log: import("../audit-logs/entities/audit-logs.entities").AuditLogs[];
            createdAt: Date;
            updatedAt: Date;
        };
        organizations: import("../organizations/entities/organization.entity").Organization[];
        is_phone_number_verified?: undefined;
    }>;
}
