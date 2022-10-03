import { z as zod } from "zod";

import { updateFolderDTOSchema } from "./schemas";
import {
    FindOneFolderContract,
    UpdateFolderContract
} from "@/repositories/folder";
import { NotFoundError } from "@/errors";

type UpdateFolderDTO = zod.infer<typeof updateFolderDTOSchema>;

export class UpdateFolderResource {
    constructor(
        private readonly findOneFolderRepository: FindOneFolderContract,
        private readonly updateFolderRepository: UpdateFolderContract
    ) { }

    async execute(dto: UpdateFolderDTO) {
        const folderData = updateFolderDTOSchema.parse(dto);
        const {
            id,
            name,
            userId
        } = folderData;

        const doesFolderExists = await this.findOneFolderRepository.findOne(
            {
                id
            }
        );
        if (!doesFolderExists || doesFolderExists.userId !== userId)
            throw new NotFoundError("Folder not found");

        const folder = await this.updateFolderRepository.update(
            {
                id,
                name
            }
        );

        return folder;
    }
}