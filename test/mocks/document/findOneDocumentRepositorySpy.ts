import { jest } from "@jest/globals";

import { FindOneDocumentContract } from "@/repositories/document";

export const findOneDocumentRepositorySpy = jest.fn<FindOneDocumentContract["findOne"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            title: "Test document",
            text: "Lorem ipsum",
            userId: 1,
            folderId: null,
            isEncrypted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);