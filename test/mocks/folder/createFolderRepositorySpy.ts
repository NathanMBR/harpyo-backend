import { jest } from "@jest/globals";

import { CreateFolderContract } from "@/repositories/folder";

export const createFolderRepositorySpy = jest.fn<CreateFolderContract["create"]>(
    async data => Promise.resolve(
        {
            id: 1,
            name: data.name,
            userId: data.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);