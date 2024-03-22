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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const permission_entity_1 = require("./entities/permission.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PermissionService = class PermissionService {
    constructor(permissionRepo) {
        this.permissionRepo = permissionRepo;
    }
    create(createPermissionDto) {
        return 'This action adds a new permission';
    }
    async createNewPermissions() {
        try {
            const new_permissions = [
                {
                    type: 'view',
                    status: true,
                },
                {
                    type: 'download',
                    status: true,
                },
            ];
            return await this.permissionRepo.save(new_permissions);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return `This action returns all permission`;
    }
    findOne(id) {
        return `This action returns a #${id} permission`;
    }
    update(id, updatePermissionDto) {
        return `This action updates a #${id} permission`;
    }
    remove(id) {
        return `This action removes a #${id} permission`;
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionService);
//# sourceMappingURL=permission.service.js.map