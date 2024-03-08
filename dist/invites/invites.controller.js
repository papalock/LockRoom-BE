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
exports.InvitesController = void 0;
const common_1 = require("@nestjs/common");
const invites_service_1 = require("./invites.service");
const create_invite_dto_1 = require("./dto/create-invite.dto");
let InvitesController = class InvitesController {
    constructor(invitesService) {
        this.invitesService = invitesService;
    }
    create(createInviteDto) {
        return this.invitesService.create(createInviteDto);
    }
    findInvitesBySenderId(sender_id) {
        return this.invitesService.findBySenderId(sender_id);
    }
    getEmailByToken(jwt_token) {
        return this.invitesService.getEmailByToken(jwt_token);
    }
    addInvitedUser(first_name, last_name, email, password, phone_number, jwt_token) {
        return this.invitesService.addInvitedUser(email, password, first_name, last_name, phone_number, jwt_token);
    }
    findAll() {
        return this.invitesService.findAll();
    }
};
exports.InvitesController = InvitesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invite_dto_1.CreateInviteDto]),
    __metadata("design:returntype", void 0)
], InvitesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('sender'),
    __param(0, (0, common_1.Body)('sender_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvitesController.prototype, "findInvitesBySenderId", null);
__decorate([
    (0, common_1.Post)('email-invite'),
    __param(0, (0, common_1.Body)('jwt_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvitesController.prototype, "getEmailByToken", null);
__decorate([
    (0, common_1.Post)('add-invite'),
    __param(0, (0, common_1.Body)('first_name')),
    __param(1, (0, common_1.Body)('last_name')),
    __param(2, (0, common_1.Body)('email')),
    __param(3, (0, common_1.Body)('password')),
    __param(4, (0, common_1.Body)('phone_number')),
    __param(5, (0, common_1.Body)('jwt_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], InvitesController.prototype, "addInvitedUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvitesController.prototype, "findAll", null);
exports.InvitesController = InvitesController = __decorate([
    (0, common_1.Controller)('invites'),
    __metadata("design:paramtypes", [invites_service_1.InvitesService])
], InvitesController);
//# sourceMappingURL=invites.controller.js.map