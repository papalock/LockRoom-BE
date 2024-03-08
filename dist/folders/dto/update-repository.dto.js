"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRepositoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_repository_dto_1 = require("./create-repository.dto");
class UpdateRepositoryDto extends (0, mapped_types_1.PartialType)(create_repository_dto_1.CreateRepositoryDto) {
}
exports.UpdateRepositoryDto = UpdateRepositoryDto;
//# sourceMappingURL=update-repository.dto.js.map