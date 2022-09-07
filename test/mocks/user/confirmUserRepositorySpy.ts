import { jest } from "@jest/globals";

import { ConfirmUserContract } from "@/repositories/user";

export const confirmUserRepositorySpy = jest.fn<ConfirmUserContract["confirm"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            name: "Random User",
            email: "random.user@test.com",
            password: "some-password",
            confirmedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);