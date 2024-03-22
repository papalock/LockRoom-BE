import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(createFileDto: CreateFileDto): string;
    findAll(organization_id: string, parent_folder_id: string): Promise<{
        name: string;
        id: string;
        type: string;
        index: string;
        children: any[];
    }>;
    findOne(id: string): Promise<import("./entities/file.entity").File>;
    update(id: string, updateFileDto: UpdateFileDto): string;
    remove(id: string): string;
}
