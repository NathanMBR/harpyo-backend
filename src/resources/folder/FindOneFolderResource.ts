import { z as zod } from "zod";

import { findOneFolderDTOSchema } from "./schemas";
import { FindOneFolderContract } from "@/repositories/folder";
import { NotFoundError } from "@/errors";

type FindOneFolderDTO = zod.infer<typeof findOneFolderDTOSchema>;

export class FindOneFolderResource {
    constructor(
        private readonly findOneFolderRepository: FindOneFolderContract
    ) { }

    async execute(dto: FindOneFolderDTO) {
        const folderData = findOneFolderDTOSchema.parse(dto);
        const {
            id,
            userId
        } = folderData;

        const folder = await this.findOneFolderRepository.findOne(
            {
                id
            }
        );

        if (!folder || folder.userId !== userId)
            throw new NotFoundError("Folder not found");

        return folder;
    }
}