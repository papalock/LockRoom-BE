import { Repository } from 'typeorm';
import { AuditLogs } from './entities/audit-logs.entities';
import { File } from 'src/files/entities/file.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
export declare class AuditLogsSerivce {
    private readonly auditLogsRepository;
    private readonly fileRepository;
    private readonly orgRepository;
    private readonly userRepository;
    constructor(auditLogsRepository: Repository<AuditLogs>, fileRepository: Repository<File>, orgRepository: Repository<Organization>, userRepository: Repository<User>);
    create(file_id: string | null, user_id: string, organization_id: string, type: string): Promise<AuditLogs[]>;
    getStats(organization_id: string, date: any): Promise<{
        data: any[];
    }>;
    findAll(): Promise<AuditLogs[]>;
    findOne(id: string): Promise<AuditLogs>;
    exportDataToExcel(organization_id: string): Promise<void>;
    update(id: number): string;
    remove(id: number): string;
}
