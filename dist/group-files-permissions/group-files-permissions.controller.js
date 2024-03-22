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
exports.GroupFilesPermissionsController = void 0;
const common_1 = require("@nestjs/common");
const group_files_permissions_service_1 = require("./group-files-permissions.service");
let GroupFilesPermissionsController = class GroupFilesPermissionsController {
    constructor(grpupFilesPermissionsService) {
        this.grpupFilesPermissionsService = grpupFilesPermissionsService;
    }
    create(file_ids, group_id, new_status, type) {
        try {
            return this.grpupFilesPermissionsService.newUpdateGroupFilePermissions(group_id, file_ids, new_status, type);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.GroupFilesPermissionsController = GroupFilesPermissionsController;
__decorate([
    (0, common_1.Post)('/update-permissions'),
    __param(0, (0, common_1.Body)('file_ids')),
    __param(1, (0, common_1.Body)('group_id')),
    __param(2, (0, common_1.Body)('new_status')),
    __param(3, (0, common_1.Body)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, Boolean, String]),
    __metadata("design:returntype", void 0)
], GroupFilesPermissionsController.prototype, "create", null);
exports.GroupFilesPermissionsController = GroupFilesPermissionsController = __decorate([
    (0, common_1.Controller)('gfp'),
    __metadata("design:paramtypes", [group_files_permissions_service_1.GroupFilesPermissionsService])
], GroupFilesPermissionsController);
//# sourceMappingURL=group-files-permissions.controller.js.map