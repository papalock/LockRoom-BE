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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const auth_guard_1 = require("../guards/auth.guard");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    findAll(organization_id, parent_folder_id) {
        return this.filesService.getAllFilesByOrg(organization_id, parent_folder_id);
    }
    findOne(id) {
        return this.filesService.findOne(id);
    }
    addDragAndDrop(organization_id, parent_folder_id, folder_name, files, request) {
        return this.filesService.dragAndDropFilesOneLevel(organization_id, parent_folder_id, folder_name, request.decoded_data.user_id, files);
    }
    addDragAndDropTwo(organization_id, parent_folder_id, files, request) {
        return this.filesService.dragAndDropFiles(organization_id, parent_folder_id, request.decoded_data.user_id, files);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('organization/all'),
    __param(0, (0, common_1.Body)('organization_id')),
    __param(1, (0, common_1.Body)('parent_folder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('drag-and-drop'),
    __param(0, (0, common_1.Body)('organization_id')),
    __param(1, (0, common_1.Body)('parent_folder_id')),
    __param(2, (0, common_1.Body)('folder_name')),
    __param(3, (0, common_1.Body)('files')),
    __param(4, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Array, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "addDragAndDrop", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('nested-drag-and-drop'),
    __param(0, (0, common_1.Body)('organization_id')),
    __param(1, (0, common_1.Body)('parent_folder_id')),
    __param(2, (0, common_1.Body)('files')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "addDragAndDropTwo", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map