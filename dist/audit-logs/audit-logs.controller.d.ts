import { Response } from 'express';
import { AuditLogsSerivce } from './audit-logs.service';
import { UploadService } from 'src/uploads/uploads.service';
export declare class AuditLogsController {
    private readonly auditLogsService;
    private readonly uploadsService;
    constructor(auditLogsService: AuditLogsSerivce, uploadsService: UploadService);
    createLoginLog(user_id: string, organization_id: string, type: string): Promise<import("./entities/audit-logs.entities").AuditLogs[]>;
    createDocumentLog(file_id: string, user_id: string, organization_id: string, type: string): Promise<import("./entities/audit-logs.entities").AuditLogs[]>;
    stats(organization_id: string, date: any): Promise<{
        data: any[];
    }>;
    getFile(organization_id: string, res: Response): Promise<void>;
}
