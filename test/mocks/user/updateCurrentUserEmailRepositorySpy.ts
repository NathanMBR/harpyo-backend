import { jest } from "@jest/globals";

import { UpdateCurrentUserEmailContract } from "@/repositories/user";

export const updateCurrentUserEmailRepositorySpy = jest.fn<UpdateCurrentUserEmailContract["updateCurrentEmail"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            name: "John Doe",
            email: data.email,
            confirmedAt: new Date(),
            password: "12345678",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);