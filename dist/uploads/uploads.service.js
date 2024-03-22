"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const files_service_1 = require("../files/files.service");
const uuid_1 = require("uuid");
let UploadService = class UploadService {
    constructor(configService, fileService) {
        this.configService = configService;
        this.fileService = fileService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.getOrThrow('AWS_S3_REGION'),
        });
    }
    async uploadMultiple(files, folder_id, user_id, organization_id) {
        console.log(files[0]);
        console.log(folder_id, user_id, organization_id);
        if (files.length > 0) {
            const file_names = [];
            const file_promises = files.map((file) => {
                let file_name = (0, uuid_1.v4)() + '-' + file.originalname;
                file_names.push(file_name);
                return this.s3Client.send(new client_s3_1.PutObjectCommand({
                    Bucket: 'lockroom',
                    Key: file_name,
                    Body: file.buffer,
                }));
            });
            const response = await Promise.all(file_promises);
            if (true) {
                for (let index = 0; index < files.length; index++) {
                    const file_name_parts = file_names[index].split('.');
                    const file_extension = file_name_parts.length > 1 ? file_name_parts.pop() : '';
                    await this.fileService.addFileToAFolder(files[index].originalname, folder_id, user_id, organization_id, files[index].mimetype || '', files[index].size || 0, file_extension, file_names[index]);
                }
            }
            return response;
        }
    }
    async uploadFileToS3(file, file_name) {
        const params = {
            Bucket: 'lockroom',
            Key: file_name,
            Body: file,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
        const upload = await this.s3Client.send(new client_s3_1.PutObjectCommand(params));
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        files_service_1.FilesService])
], UploadService);
//# sourceMappingURL=uploads.service.js.map