import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { Invite } from 'src/invites/entities/invite.entity';
export declare class OrganizationsService {
    private readonly orgRepository;
    private readonly inviteRepository;
    constructor(orgRepository: Repository<Organization>, inviteRepository: Repository<Invite>);
    create(createOrganizationDto: CreateOrganizationDto): string;
    findAll(): string;
    findOne(id: string): Promise<Organization>;
    getUsersByOrganization(organization_id: string): Promise<any>;
    getUsersByOrganizationAndGroup(organization_id: string, group_id: string): Promise<any>;
    update(id: number, updateOrganizationDto: UpdateOrganizationDto): string;
    remove(id: number): string;
}
