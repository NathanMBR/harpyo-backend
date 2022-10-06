import { jest } from "@jest/globals";

import { UpdateDocumentContract } from "@/repositories/document";

export const updateDocumentRepositorySpy = jest.fn<UpdateDocumentContract["update"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            title: data.title,
            text: data.text,
            userId: 1,
            folderId: data.folderId,
            isEncrypted: data.isEncrypted,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);