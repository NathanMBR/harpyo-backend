import { jest } from "@jest/globals";

import { FindAllFoldersContract } from "@/repositories/folder";

export const findAllFoldersRepositorySpy = jest.fn<FindAllFoldersContract["findAll"]>(
    async data => Promise.resolve(
        [
            {
                id: 1,
                name: "Test folder 1",
                userId: data.userId,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            },

            {
                id: 2,
                name: "Test folder 2",
                userId: data.userId,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            },

            {
                id: 3,
                name: "Test folder 3",
                userId: data.userId,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }
        ]
    )
);