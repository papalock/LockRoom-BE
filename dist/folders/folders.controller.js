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
const update_repository_dto_1 = require("./dto/update-repository.dto");
let FoldersController = class FoldersController {
    constructor(foldersService) {
        this.foldersService = foldersService;
    }
    create(name, user_id, parent_folder_id, organization_id) {
        try {
            return this.foldersService.create(name, user_id, organization_id, parent_folder_id);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.foldersService.findAll();
    }
    findAllByOrganization(organization_id, user_id) {
        return this.foldersService.findAllByOrganization(organization_id, user_id);
    }
    findAllByUserId(id) {
        return this.foldersService.findAllByUserId(id);
    }
    findOne(id) {
        return this.foldersService.findOne(+id);
    }
    update(id, updateRepositoryDto) {
    }
    remove(id) {
        return this.foldersService.remove(id);
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('user_id')),
    __param(2, (0, common_1.Body)('parent_folder_id')),
    __param(3, (0, common_1.Body)('organization_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/organization'),
    __param(0, (0, common_1.Body)('organization_id')),
    __param(1, (0, common_1.Body)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "findAllByOrganization", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_repository_dto_1.UpdateRepositoryDto]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "remove", null);
exports.FoldersController = FoldersController = __decorate([
    (0, common_1.Controller)('folders'),
    __metadata("design:paramtypes", [folders_service_1.FoldersService])
], FoldersController);
//# sourceMappingURL=folders.controller.js.map