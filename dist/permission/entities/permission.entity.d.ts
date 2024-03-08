import { FilesPermissions } from 'src/files-permissions/entities/files-permissions.entity';
export declare class Permission {
    id: string;
    type: string;
    status: boolean;
    FilesPermissions: FilesPermissions[];
    createdAt: Date;
    updatedAt: Date;
    addId(): void;
}
