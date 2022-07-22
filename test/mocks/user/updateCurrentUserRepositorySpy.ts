import { jest } from "@jest/globals";

import { UpdateCurrentUserContract } from "@/repositories/user";

export const updateCurrentUserRepositorySpy = jest.fn<UpdateCurrentUserContract["updateCurrent"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            name: data.name,
            email: `${data.name.split(" ")[0].toLowerCase()}@email.com`,
            password: "password",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);