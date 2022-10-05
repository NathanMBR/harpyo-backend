import { z as zod } from "zod";

import { findAllDocumentsDTOSchema } from "./schemas";
import {
    FindAllDocumentsContract,
    CountAllDocumentsContract
} from "@/repositories/document";
import {
    getPaginationParametersHelper,
    getPaginationDataHelper
} from "@/helpers";

type FindAllDocumentsDTO = zod.infer<typeof findAllDocumentsDTOSchema>;

export class FindAllDocumentsResource {
    constructor(
        private readonly findAllDocumentsRepository: FindAllDocumentsContract,
        private readonly countAllDocumentsRepository: CountAllDocumentsContract
    ) { }

    async execute(dto: FindAllDocumentsDTO) {
        const documentData = findAllDocumentsDTOSchema.parse(dto);
        const {
            userId,
            folderId,
            page,
            quantity,
            orderColumn,
            orderBy,
            search
        } = documentData;

        const {
            skip,
            take
        } = getPaginationParametersHelper(page, quantity);

        const documents = await this.findAllDocumentsRepository.findAll(
            {
                userId,
                folderId,
                skip,
                take,
                orderColumn: orderColumn,
                orderBy: orderBy,
                search
            }
        );

        const documentsCount = await this.countAllDocumentsRepository.countAll(
            {
                userId,
                folderId,
                search
            }
        );

        const paginatedDocuments = getPaginationDataHelper(
            {
                count: documentsCount,
                skip,
                take,
                data: documents
            }
        );

        return paginatedDocuments;
    }
}