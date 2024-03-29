import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    findAll(organization_id: string, parent_folder_id: string): Promise<{
        name: string;
        id: string;
        type: string;
        index: string;
        children: any[];
    }>;
    findOne(id: string): Promise<import("./entities/file.entity").File>;
    addDragAndDrop(organization_id: string, parent_folder_id: string, folder_name: string, files: [], request: any): Promise<any[]>;
    addDragAndDropTwo(organization_id: string, parent_folder_id: string, files: [], request: any): Promise<any[]>;
}
