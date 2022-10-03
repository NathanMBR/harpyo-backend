import { jest } from "@jest/globals";

import { UpdateFolderContract } from "@/repositories/folder";

export const updateFolderRepositorySpy = jest.fn<UpdateFolderContract["update"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            name: data.name,
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);