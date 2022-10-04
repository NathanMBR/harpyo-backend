import { jest } from "@jest/globals";

import { CreateDocumentContract } from "@/repositories/document";

export const createDocumentRepositorySpy = jest.fn<CreateDocumentContract["create"]>(
    async data => Promise.resolve(
        {
            id: 1,
            title: data.title,
            text: data.text,
            userId: data.userId,
            folderId: data.folderId,
            isEncrypted: data.isEncrypted,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);