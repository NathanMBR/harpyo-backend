import { jest } from "@jest/globals";

import { CreateUserContract } from "@/repositories/user";

export const createUserRepositorySpy = jest.fn<CreateUserContract["create"]>(
    async data => Promise.resolve(
        {
            id: 1,
            name: data.name,
            email: data.email,
            password: "password",
            createdAt: new Date(),
            updatedAt: new Date(),
            confirmedAt: null,
            deletedAt: null,

            emailConfirmation: {
                id: 1,
                userId: 1,
                email: data.email,
                token: "token",
                lastRequestedAt: new Date(),
                confirmedAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }
        }
    )
);