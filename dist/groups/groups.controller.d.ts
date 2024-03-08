import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(name: string, user_id: string, organization_id: string): Promise<import("./entities/group.entity").Group>;
    removeUserFromAGroup(groupId: string, userId: string): Promise<import("./entities/group.entity").Group>;
    findAll(): Promise<import("./entities/group.entity").Group[]>;
    findAllUsersInGroup(id: string): Promise<import("./entities/group.entity").Group>;
    findGroupsByOrganizationAndUserId(organization_id: string, user_id: string): Promise<any[]>;
    findOne(id: string): Promise<import("./entities/group.entity").Group>;
    update(id: string, updateGroupDto: UpdateGroupDto): void;
    remove(id: string): string;
}
