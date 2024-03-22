import { File } from 'src/files/entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Group } from 'src/groups/entities/group.entity';
export declare class AuditLogs {
    id: string;
    type: string;
    user: User;
    group: Group;
    organization: Organization;
    file: File;
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
