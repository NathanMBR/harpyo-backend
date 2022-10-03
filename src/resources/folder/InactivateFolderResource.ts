import { z as zod } from "zod";

import { inactivateFolderDTOSchema } from "./schemas";
import {
    FindOneFolderContract,
    InactivateFolderContract
} from "@/repositories/folder";
import { NotFoundError } from "@/errors";

type InactivateFolderDTO = zod.infer<typeof inactivateFolderDTOSchema>;

export class InactivateFolderResource {
    constructor(
        private readonly findOneFolderRepository: FindOneFolderContract,
        private readonly inactivateFolderRepository: InactivateFolderContract
    ) { }

    async execute(dto: InactivateFolderDTO) {
        const folderData = inactivateFolderDTOSchema.parse(dto);
        const {
            id,
            userId
        } = folderData;

        const doesFolderExist = await this.findOneFolderRepository.findOne(
            {
                id
            }
        );
        if (!doesFolderExist || doesFolderExist.userId !== userId)
            throw new NotFoundError("Folder not found");

        await this.inactivateFolderRepository.inactivate(
            {
                id
            }
        );

        return;
    }
}