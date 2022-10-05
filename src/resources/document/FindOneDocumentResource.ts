import { z as zod } from "zod";

import { findOneDocumentDTOSchema } from "./schemas";
import { FindOneDocumentContract } from "@/repositories/document";
import { NotFoundError } from "@/errors";

type FindOneDocumentDTO = zod.infer<typeof findOneDocumentDTOSchema>;

export class FindOneDocumentResource {
    constructor(
        private readonly findOneDocumentRepository: FindOneDocumentContract
    ) { }

    async execute(dto: FindOneDocumentDTO) {
        const documentData = findOneDocumentDTOSchema.parse(dto);
        const {
            id,
            userId
        } = documentData;

        const document = await this.findOneDocumentRepository.findOne(
            {
                id
            }
        );

        if (!document || document.userId !== userId)
            throw new NotFoundError("Document not found");

        return document;
    }
}