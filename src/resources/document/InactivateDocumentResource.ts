import { z as zod } from "zod";

import { inactivateDocumentDTOSchema } from "./schemas";
import {
    FindOneDocumentContract,
    InactivateDocumentContract
} from "@/repositories/document";
import { NotFoundError } from "@/errors";

type InactivateDocumentDTO = zod.infer<typeof inactivateDocumentDTOSchema>;

export class InactivateDocumentResource {
    constructor(
        private readonly findOneDocumentRepository: FindOneDocumentContract,
        private readonly inactivateDocumentRepository: InactivateDocumentContract
    ) { }

    async execute(dto: InactivateDocumentDTO) {
        const documentData = inactivateDocumentDTOSchema.parse(dto);
        const {
            id,
            userId
        } = documentData;

        const doesDocumentExist = await this.findOneDocumentRepository.findOne(
            {
                id
            }
        );
        if (!doesDocumentExist || doesDocumentExist.userId !== userId)
            throw new NotFoundError("Document not found");

        await this.inactivateDocumentRepository.inactivate(
            {
                id
            }
        );

        return;
    }
}