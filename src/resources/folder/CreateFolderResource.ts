import { z as zod } from "zod";

import { createFolderDTOSchema } from "./schemas";
import { CreateFolderContract } from "@/repositories/folder";

type CreateFolderDTO = zod.infer<typeof createFolderDTOSchema>;

export class CreateFolderResource {
    constructor(
        private readonly createFolderRepository: CreateFolderContract
    ) { }

    async execute(dto: CreateFolderDTO) {
        const folderData = createFolderDTOSchema.parse(dto);
        const {
            name,
            userId
        } = folderData;

        const folder = await this.createFolderRepository.create(
            {
                name,
                userId
            }
        );

        return folder;
    }
}