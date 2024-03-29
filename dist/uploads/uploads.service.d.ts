/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { FilesService } from 'src/files/files.service';
export declare class UploadService {
    private readonly configService;
    private readonly fileService;
    private readonly s3Client;
    constructor(configService: ConfigService, fileService: FilesService);
    uploadMultiple(files: any[], folder_id: string, user_id: string, organization_id: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput[]>;
    uploadEcelFileToS3(file: Buffer, file_name: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    dragAndDrop(files: any[], file_ids: string[]): Promise<any[]>;
}
