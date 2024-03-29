import { GroupsService } from './groups.service';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(name: string, organization_id: string, request: any): Promise<import("./entities/group.entity").Group>;
    removeUserFromAGroup(groupId: string, request: any): Promise<import("./entities/group.entity").Group>;
    findAllUsersInGroup(id: string): Promise<import("./entities/group.entity").Group>;
    findGroupsByOrganizationAndUserId(organization_id: string, request: any): Promise<any[]>;
}
