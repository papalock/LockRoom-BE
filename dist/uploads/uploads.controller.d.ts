/// <reference types="multer" />
import { UploadService } from './uploads.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(files: Array<Express.Multer.File>, organization_id: string, folder_id: string, request: any): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput[]>;
    dragAndDrop(files: Array<Express.Multer.File>, file_ids: string[]): Promise<any[]>;
}
