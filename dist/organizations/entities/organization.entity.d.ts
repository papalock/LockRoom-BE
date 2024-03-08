import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Invite } from 'src/invites/entities/invite.entity';
import { File } from 'src/files/entities/file.entity';
import { Folder } from 'src/folders/entities/folder.entity';
export declare class Organization {
    id: string;
    name: string;
    creator: User;
    users: User[];
    groups: Group[];
    invites: Invite[];
    files: File[];
    folder: Folder[];
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
