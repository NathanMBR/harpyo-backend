import { z as zod } from "zod";

import { createDocumentDTOSchema } from "./schemas";
import { CreateDocumentContract } from "@/repositories/document";

type CreateDocumentDTO = zod.infer<typeof createDocumentDTOSchema>;

export class CreateDocumentResource {
    constructor(
        private readonly createDocumentRepository: CreateDocumentContract
    ) { }

    async execute(dto: CreateDocumentDTO) {
        const documentData = createDocumentDTOSchema.parse(dto);
        const {
            title,
            text,
            folderId,
            userId,
            isEncrypted
        } = documentData;

        const document = await this.createDocumentRepository.create(
            {
                title,
                text,
                folderId,
                userId,
                isEncrypted
            }
        );

        return document;
    }
}