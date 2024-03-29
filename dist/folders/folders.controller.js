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
exports.FoldersController = void 0;
const common_1 = require("@nestjs/common");
const folders_service_1 = require("./folders.service");
const auth_guard_1 = require("../guards/auth.guard");
let FoldersController = class FoldersController {
    constructor(foldersService) {
        this.foldersService = foldersService;
    }
    create(name, parent_folder_id, organization_id, request) {
        try {
            return this.foldersService.create(name, request.decoded_data.user_id, organization_id, parent_folder_id);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAllByOrganization(organization_id, request) {
        return this.foldersService.findAllByOrganization(organization_id, request.decoded_data.user_id);
    }
    rename(folder_id, new_name, parent_folder_id) {
        return this.foldersService.rename(folder_id, new_name, parent_folder_id);
    }
    remove(folder_id) {
        return this.foldersService.soft_delete(folder_id);
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('parent_folder_id')),
    __param(2, (0, common_1.Body)('organization_id')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/organization'),
    __param(0, (0, common_1.Body)('organization_id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "findAllByOrganization", null);
__decorate([
    (0, common_1.Post)('rename'),
    __param(0, (0, common_1.Body)('folder_id')),
    __param(1, (0, common_1.Body)('new_name')),
    __param(2, (0, common_1.Body)('parent_folder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "rename", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)('folder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "remove", null);
exports.FoldersController = FoldersController = __decorate([
    (0, common_1.Controller)('folders'),
    __metadata("design:paramtypes", [folders_service_1.FoldersService])
], FoldersController);
//# sourceMappingURL=folders.controller.js.map