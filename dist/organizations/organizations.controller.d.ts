import { OrganizationsService } from './organizations.service';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    getUserByOrganizationAndGroup(organization_id: string, group_id: string): Promise<any>;
    getUserByOrganization(organization_id: string): Promise<any>;
}
