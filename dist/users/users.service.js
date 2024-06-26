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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const folder_entity_1 = require("../folders/entities/folder.entity");
const group_entity_1 = require("../groups/entities/group.entity");
const bcrypt = require("bcrypt");
const typeorm_3 = require("typeorm");
const email_templates_1 = require("../utils/email.templates");
const jwt_utils_1 = require("../utils/jwt.utils");
const invite_entity_1 = require("../invites/entities/invite.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
let UsersService = class UsersService {
    constructor(userRepository, jwtService, auditService, folderRepository, groupsRepository, orgRepository, inviteRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.auditService = auditService;
        this.folderRepository = folderRepository;
        this.groupsRepository = groupsRepository;
        this.orgRepository = orgRepository;
        this.inviteRepository = inviteRepository;
    }
    async create(createUserDto) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email: createUserDto.email },
            });
            if (existingUser)
                throw new common_1.ConflictException('user already exists');
            const find_invites = await this.inviteRepository.find({
                where: {
                    sent_to: createUserDto.email,
                },
            });
            if (find_invites.length > 0)
                throw new common_1.ConflictException(`You've already been invited, Check your email!`);
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            createUserDto.password = hashedPassword;
            createUserDto.full_name = `${createUserDto.first_name} ${createUserDto.last_name}`;
            createUserDto.role = 'admin';
            const create_user = this.userRepository.create({
                email: createUserDto.email,
                password: createUserDto.password,
                first_name: createUserDto.first_name,
                last_name: createUserDto.last_name,
                role: createUserDto.role,
                phone_number: createUserDto.phone_number,
                full_name: createUserDto.full_name,
            });
            const user = await this.userRepository.save(create_user);
            const payload = { user_id: user.id, email: user.email };
            const access_token = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            });
            const new_group = this.groupsRepository.create({
                name: 'Admin',
                createdBy: user,
            });
            const saved_group = await this.groupsRepository.save(new_group);
            const new_org = this.orgRepository.create({
                name: 'ORG-' + user.id.slice(0, 5),
                creator: user,
                groups: [saved_group],
                users: [],
                invites: [],
            });
            const saveOrg = await this.orgRepository.save(new_org);
            await this.folderRepository.save({
                name: 'Home',
                parent_folder_id: null,
                tree_index: '1',
                users: [user],
                organization: saveOrg,
                absolute_path: '/Home'
            });
            const mail = {
                to: user.email,
                subject: 'Verify Email',
                from: String(process.env.VERIFIED_SENDER_EMAIL) || 'waleed@lockroom.com',
                text: 'Verify',
                html: (0, email_templates_1.verificationTemplate)(String(user.first_name).toUpperCase(), `${process.env.FE_HOST}/thank-you/verify-email?customer=${access_token}`),
            };
            return {
                user: { ...user, organization_created: saveOrg },
                access_token,
                files_count: 1,
                id: user.id,
                organizations: [saveOrg],
            };
        }
        catch (error) {
            console.log(error, 'err');
            throw new common_1.InternalServerErrorException(error.message || 'failed to create user');
        }
    }
    async loginUser(email, password) {
        try {
            const user = await this.userRepository.findOne({
                relations: [
                    'organizations_added_in.groups',
                    'organization_created.groups',
                ],
                where: { email },
            });
            const orgs = [];
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid Credentials');
            }
            if (user.sso_login && user.sso_type == 'google')
                throw new common_1.UnauthorizedException('Login with Google');
            const passwordMatched = await bcrypt.compare(password, user.password);
            if (!passwordMatched) {
                throw new common_1.UnauthorizedException('Invalid Credentials');
            }
            if (user.role == 'admin') {
                const payload = {
                    user_id: user.id,
                    email: user.email,
                    role: user.role,
                };
                const accessToken = this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1d',
                });
                if (user.organization_created) {
                    orgs.push(user.organization_created.id);
                }
                user.organizations_added_in.map((org) => {
                    orgs.push(org.id);
                });
                const organizations = await this.orgRepository.find({
                    relations: ['users', 'creator'],
                    where: {
                        id: (0, typeorm_2.In)(orgs),
                    },
                });
                return {
                    access_token: accessToken,
                    is_phone_number_verified: user.phone_number ? true : false,
                    id: user.id,
                    user,
                    organizations,
                };
            }
            if (user.role == 'guest') {
                const payload = {
                    user_id: user.id,
                    email: user.email,
                    role: user.role,
                };
                const accessToken = this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1d',
                });
                user.organizations_added_in.map((org) => {
                    orgs.push(org.id);
                });
                const organizations = await this.orgRepository.find({
                    relations: ['users', 'creator'],
                    where: {
                        id: (0, typeorm_2.In)(orgs),
                    },
                });
                const new_audit = await this.auditService.create(null, user.id, user.organizations_added_in[0].id, 'login');
                return {
                    access_token: accessToken,
                    is_phone_number_verified: user.phone_number ? true : false,
                    id: user.id,
                    user,
                    organizations,
                };
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async loginWithGoogle(jwt_token) {
        try {
            const user = (0, jwt_utils_1.decodeJwtResponse)(jwt_token);
            if (!user)
                throw new common_1.UnauthorizedException('token invalid');
            const find_user = await this.userRepository.findOne({
                relations: ['organizations_added_in', 'organization_created'],
                where: {
                    email: user.email,
                },
            });
            if (find_user) {
                const orgs = [];
                orgs.push(find_user?.organization_created?.id);
                find_user.organizations_added_in.map((org) => {
                    orgs.push(org.id);
                });
                const organizations = await this.orgRepository.find({
                    relations: ['users', 'creator'],
                    where: {
                        id: (0, typeorm_2.In)(orgs),
                    },
                });
                const query = await this.folderRepository
                    .createQueryBuilder('folder')
                    .leftJoinAndSelect('folder.users', 'user')
                    .where('user.id = :user_id', { user_id: find_user.id })
                    .getMany();
                const query1 = await this.folderRepository
                    .createQueryBuilder('folder')
                    .leftJoinAndSelect('folder.users', 'user')
                    .leftJoin('folder.sub_folders', 'sub_folder')
                    .addSelect('COUNT(DISTINCT sub_folder.id)', 'sub_folder_count')
                    .where('user.id = :user_id', { user_id: find_user.id })
                    .groupBy('folder.id, user.id')
                    .orderBy('folder.createdAt', 'ASC')
                    .getRawMany();
                const payload = {
                    user_id: find_user.id,
                    email: find_user.email,
                    role: find_user.role,
                };
                const accessToken = this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1d',
                });
                return {
                    access_token: accessToken,
                    is_phone_number_verified: find_user.phone_number ? true : false,
                    folders: query,
                    files_count: query.length,
                    sub_folder_count: query1,
                    id: find_user.id,
                    user: find_user,
                    organizations,
                };
            }
            const find_invites = await this.inviteRepository.find({
                where: {
                    sent_to: user?.email,
                },
            });
            if (find_invites.length > 0)
                throw new common_1.ConflictException(`You've already been invited, Check your email!`);
            const new_user = this.userRepository.create({
                email: user.email,
                full_name: `${user.given_name} ${user.family_name}`,
                first_name: user.given_name,
                last_name: user.family_name,
                display_picture_url: user.picture,
                sso_login: true,
                sso_type: 'google',
            });
            const saved_user = await this.userRepository.save(new_user);
            const query1 = await this.folderRepository
                .createQueryBuilder('folder')
                .leftJoinAndSelect('folder.users', 'user')
                .leftJoin('folder.sub_folders', 'sub_folder')
                .addSelect('COUNT(DISTINCT sub_folder.id)', 'sub_folder_count')
                .where('user.id = :user_id', { user_id: new_user.id })
                .groupBy('folder.id, user.id')
                .orderBy('folder.createdAt', 'ASC')
                .getRawMany();
            const new_group = this.groupsRepository.create({
                name: 'Admin',
                createdBy: new_user,
            });
            const saved_group = await this.groupsRepository.save(new_group);
            const new_org = this.orgRepository.create({
                name: 'ORG-' + new_user.id.slice(0, 5),
                creator: saved_user,
                groups: [saved_group],
                users: [],
                invites: [],
            });
            const saveOrg = await this.orgRepository.save(new_org);
            const payload = { user_id: new_user.id, email: new_user.email };
            const access_token = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            });
            const folder = await this.folderRepository.save({
                name: 'Home',
                parent_folder_id: null,
                tree_index: '1',
                users: [new_user],
                organization: saveOrg,
                absolute_path: '/Home'
            });
            return {
                access_token,
                folders: [folder],
                files_count: 1,
                id: new_user.id,
                sub_folder_count: query1,
                user: { ...new_user, organization_created: saveOrg },
                organizations: [saveOrg],
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message || 'failed to create user');
        }
    }
    async verifyEmail(user_id) {
        try {
            if (user_id) {
                const find_user = await this.userRepository.findOne({
                    where: {
                        id: user_id,
                    },
                });
                if (!find_user)
                    throw new common_1.NotFoundException('user not found');
                find_user.is_email_verified = true;
                return await this.userRepository.save(find_user);
            }
        }
        catch (error) { }
    }
    async getUserByToken(user_id) {
        try {
            if (!user_id)
                throw new common_1.NotFoundException('Missing Fields');
            const find_user = await this.userRepository.findOne({
                relations: ['organizations_added_in', 'organization_created'],
                where: {
                    id: user_id,
                },
            });
            if (!find_user) {
                throw new common_1.NotFoundException('user not found');
            }
            const orgs = [];
            if (find_user.role == 'admin')
                orgs.push(find_user.organization_created);
            find_user.organizations_added_in.map((org) => {
                orgs.push(org);
            });
            return { findUser: find_user, organizations: orgs };
        }
        catch (error) {
            console.log(error, 'err');
            throw error;
        }
    }
    async findOne(where) {
        return await this.userRepository.findOne({
            relations: ['organization_created', 'organizations_added_in', 'groups'],
            where: where,
        });
    }
    async getAllGroups(user_id) {
        try {
            if (!user_id)
                throw new common_1.NotFoundException("Missing Fields");
            const find_user = await this.userRepository.findOne({
                relations: ['groups'],
                where: {
                    id: user_id,
                },
            });
            if (!find_user)
                throw new common_1.NotFoundException({
                    status: 404,
                    message: 'user not found',
                });
            if (find_user.role == 'admin') {
                return await this.groupsRepository.find({
                    where: { createdBy: { id: user_id } },
                });
            }
            return find_user.groups;
        }
        catch (error) {
            console.log(error, 'in err lol');
            throw Error(error);
        }
    }
    async findAll() {
        try {
            return await this.userRepository.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch users');
        }
    }
    async truncateUserTable() {
        const entityManager = new typeorm_3.DataSource({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        }).initialize();
        try {
            await (await entityManager).manager.query('TRUNCATE TABLE "user" CASCADE');
            console.log('User table truncated successfully.');
            return { success: true };
        }
        catch (error) {
            console.error('Error truncating user table:', error);
            throw Error(error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(folder_entity_1.Folder)),
    __param(4, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(5, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(6, (0, typeorm_1.InjectRepository)(invite_entity_1.Invite)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        audit_logs_service_1.AuditLogsSerivce,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map