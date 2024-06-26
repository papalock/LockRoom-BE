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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsController = void 0;
const common_1 = require("@nestjs/common");
const audit_logs_service_1 = require("./audit-logs.service");
const uploads_service_1 = require("../uploads/uploads.service");
const auth_guard_1 = require("../guards/auth.guard");
let AuditLogsController = class AuditLogsController {
    constructor(auditLogsService, uploadsService) {
        this.auditLogsService = auditLogsService;
        this.uploadsService = uploadsService;
    }
    createLoginLog(organization_id, type, request) {
        return this.auditLogsService.create(null, request.decoded_data.user_id, organization_id, type);
    }
    createDocumentLog(file_id, organization_id, type, request) {
        return this.auditLogsService.create(file_id, request.decoded_data.user_id, organization_id, type);
    }
    stats(organization_id, date) {
        return this.auditLogsService.getStats(organization_id, date);
    }
    async getFile(organization_id, res) {
        const file = await this.auditLogsService.exportDataToExcel(organization_id);
    }
};
exports.AuditLogsController = AuditLogsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('organization_id')),
    __param(1, (0, common_1.Body)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "createLoginLog", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('document'),
    __param(0, (0, common_1.Body)('file_id')),
    __param(1, (0, common_1.Body)('organization_id')),
    __param(2, (0, common_1.Body)('type')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "createDocumentLog", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('stats'),
    __param(0, (0, common_1.Body)('organization_id')),
    __param(1, (0, common_1.Body)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Param)('organization_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuditLogsController.prototype, "getFile", null);
exports.AuditLogsController = AuditLogsController = __decorate([
    (0, common_1.Controller)('audit'),
    __metadata("design:paramtypes", [audit_logs_service_1.AuditLogsSerivce,
        uploads_service_1.UploadService])
], AuditLogsController);
//# sourceMappingURL=audit-logs.controller.js.map