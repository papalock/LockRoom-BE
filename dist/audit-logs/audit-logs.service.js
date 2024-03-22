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
exports.AuditLogsSerivce = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_logs_entities_1 = require("./entities/audit-logs.entities");
const file_entity_1 = require("../files/entities/file.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const user_entity_1 = require("../users/entities/user.entity");
const excel_utils_1 = require("../utils/excel.utils");
const date_fns_1 = require("date-fns");
let AuditLogsSerivce = class AuditLogsSerivce {
    constructor(auditLogsRepository, fileRepository, orgRepository, userRepository) {
        this.auditLogsRepository = auditLogsRepository;
        this.fileRepository = fileRepository;
        this.orgRepository = orgRepository;
        this.userRepository = userRepository;
    }
    async create(file_id, user_id, organization_id, type) {
        const find_user = await this.userRepository.findOne({
            relations: ['groups', 'createdGroups'],
            where: {
                id: user_id,
            },
        });
        const find_file = file_id
            ? await this.fileRepository.findOne({
                where: {
                    id: file_id,
                },
            })
            : null;
        const find_org = await this.orgRepository.findOne({
            where: {
                id: organization_id,
            },
        });
        const groups = [...find_user.groups, ...find_user.createdGroups];
        const audit_logs = groups.map((item) => {
            return this.auditLogsRepository.create({
                file: file_id ? find_file : null,
                organization: find_org,
                user: find_user,
                group: item,
                type,
            });
        });
        return await this.auditLogsRepository.save(audit_logs);
    }
    async getStats(organization_id, date) {
        try {
            let startDate;
            if (date.type == 'days') {
                startDate = (0, date_fns_1.subDays)(new Date(), date.value);
            }
            else if (date.type == 'months') {
                startDate = (0, date_fns_1.subMonths)(new Date(), date.value);
            }
            const formattedStartDate = startDate && (0, date_fns_1.format)(startDate, 'yyyy-MM-dd');
            const group_rankings_query = this.auditLogsRepository
                .createQueryBuilder('audit_logs')
                .select('group.name', 'group_name')
                .addSelect('COUNT(*)', 'total')
                .addSelect(`COUNT(*) FILTER (WHERE audit_logs.type = 'view')`, 'views')
                .addSelect(`COUNT(*) FILTER (WHERE audit_logs.type = 'login')`, 'login')
                .leftJoin('audit_logs.group', 'group')
                .groupBy('group.name');
            if (date.type == 'days' || date.type == 'months') {
                group_rankings_query.where('audit_logs.createdAt >= :startDate', {
                    startDate: formattedStartDate,
                });
            }
            const group_rankings = await group_rankings_query.getRawMany();
            const user_rankings_query = this.auditLogsRepository
                .createQueryBuilder('audit_logs')
                .select('group.name', 'group_name')
                .addSelect('user.full_name', 'user_name')
                .addSelect('user.email', 'user_email')
                .addSelect('user.createdAt', 'joined_date')
                .addSelect('COUNT(*)', 'engagement')
                .leftJoin('audit_logs.group', 'group')
                .leftJoin('audit_logs.user', 'user')
                .groupBy('group.name, user.full_name, user.createdAt, user.email')
                .where('audit_logs.organizationId = :organization_id', {
                organization_id,
            })
                .orderBy('engagement', 'DESC');
            if (date.type == 'days' || date.type == 'months') {
                user_rankings_query.where('audit_logs.createdAt >= :startDate', {
                    startDate: formattedStartDate,
                });
            }
            const user_rankings = await user_rankings_query.limit(4).getRawMany();
            const document_rankings_query = this.auditLogsRepository
                .createQueryBuilder('audit_logs')
                .select('group.name', 'group_name')
                .addSelect('file.name', 'file_name')
                .addSelect('file.id', 'id')
                .addSelect('file.mime_type', 'mime_type')
                .addSelect('folder.name', 'folder_name')
                .addSelect('COUNT(*)', 'views')
                .leftJoin('audit_logs.group', 'group')
                .leftJoin('audit_logs.file', 'file')
                .leftJoin('file.folder', 'folder')
                .groupBy('group.name, file.id, folder.name, file.mime_type')
                .where('audit_logs.organizationId = :organization_id', {
                organization_id,
            })
                .andWhere('audit_logs.type = :type', {
                type: 'view',
            });
            if (date.type == 'days' || date.type == 'months') {
                document_rankings_query.where('audit_logs.createdAt >= :startDate', {
                    startDate: formattedStartDate,
                });
            }
            const document_rankings = await document_rankings_query
                .limit(3)
                .getRawMany();
            const createObjs = (name, group_data, document_data, user_data) => {
                return {
                    group_name: name,
                    ...group_data,
                    documents: document_data,
                    users: user_data,
                };
            };
            const data = [];
            group_rankings.map((group) => {
                const docs = [];
                const users = [];
                document_rankings.map((doc) => {
                    if (doc.group_name == group.group_name) {
                        delete doc.group_name;
                        docs.push(doc);
                    }
                });
                user_rankings.map((user) => {
                    if (user.group_name == group.group_name) {
                        delete user.group_name;
                        users.push(user);
                    }
                });
                data.push(createObjs(group.group_name, group, docs, users));
            });
            return { data };
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        return await this.auditLogsRepository.find({
            relations: ['user'],
        });
    }
    async findOne(id) {
        try {
            return await this.auditLogsRepository.findOne({
                where: {
                    id,
                },
                relations: ['users'],
            });
        }
        catch (error) { }
    }
    async exportDataToExcel(organization_id) {
        const audit_logs = await this.auditLogsRepository.find({
            relations: ['user'],
            where: {
                organization: {
                    id: organization_id,
                },
            },
        });
        const data = audit_logs.map((item) => {
            return {
                user_name: item.user.full_name,
                created_at: item.createdAt,
            };
        });
        console.log(await (0, excel_utils_1.createExcelWorkbook)(data));
    }
    update(id) {
        return `This action updates a #${id} group`;
    }
    remove(id) {
        return `This action removes a #${id} group`;
    }
};
exports.AuditLogsSerivce = AuditLogsSerivce;
exports.AuditLogsSerivce = AuditLogsSerivce = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_logs_entities_1.AuditLogs)),
    __param(1, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __param(2, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuditLogsSerivce);
//# sourceMappingURL=audit-logs.service.js.map