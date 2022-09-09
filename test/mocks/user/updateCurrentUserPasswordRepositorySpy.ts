import { jest } from "@jest/globals";

import { UpdateCurrentUserPasswordContract } from "@/repositories/user";

export const updateCurrentUserPasswordRepositorySpy = jest.fn<UpdateCurrentUserPasswordContract["updateCurrentPassword"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            name: "John Doe",
            email: "john.doe@test.com",
            confirmedAt: new Date(),
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);