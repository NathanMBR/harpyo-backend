import { jest } from "@jest/globals";

import { FindAllDocumentsContract } from "@/repositories/document";

export const findAllDocumentsRepositorySpy = jest.fn<FindAllDocumentsContract["findAll"]>(
    async data => Promise.resolve(
        [
            {
                id: 1,
                title: "Test document 1",
                text: "Lorem ipsum 1",
                userId: data.userId,
                folderId: 1,
                isEncrypted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            },

            {
                id: 2,
                title: "Test document 2",
                text: "Lorem ipsum 2",
                userId: data.userId,
                folderId: 2,
                isEncrypted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            },

            {
                id: 3,
                title: "Test document 3",
                text: "Lorem ipsum 3",
                userId: data.userId,
                folderId: 3,
                isEncrypted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }
        ]
    )
);