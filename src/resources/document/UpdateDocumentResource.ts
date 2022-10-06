import { z as zod } from "zod";

import { updateDocumentDTOSchema } from "./schemas";
import {
    FindOneDocumentContract,
    UpdateDocumentContract
} from "@/repositories/document";
import { NotFoundError } from "@/errors";

type UpdateDocumentDTO = zod.infer<typeof updateDocumentDTOSchema>;

export class UpdateDocumentResource {
    constructor(
        private readonly findOneDocumentRepository: FindOneDocumentContract,
        private readonly updateDocumentRepository: UpdateDocumentContract
    ) { }

    async execute(dto: UpdateDocumentDTO) {
        const documentData = updateDocumentDTOSchema.parse(dto);
        const {
            id,
            title,
            text,
            folderId,
            userId,
            isEncrypted
        } = documentData;

        const doesDocumentExists = await this.findOneDocumentRepository.findOne(
            {
                id
            }
        );

        if (!doesDocumentExists || doesDocumentExists.userId !== userId)
            throw new NotFoundError("Document not found");

        const document = await this.updateDocumentRepository.update(
            {
                id,
                title,
                text,
                folderId,
                isEncrypted
            }
        );

        return document;
    }
}