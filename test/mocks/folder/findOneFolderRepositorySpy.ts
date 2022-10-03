import { jest } from "@jest/globals";

import { FindOneFolderContract } from "@/repositories/folder";

export const findOneFolderRepositorySpy = jest.fn<FindOneFolderContract["findOne"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            name: "Test folder",
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);