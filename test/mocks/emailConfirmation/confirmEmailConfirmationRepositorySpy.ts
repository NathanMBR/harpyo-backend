import { jest } from "@jest/globals";

import { ConfirmEmailConfirmationContract } from "@/repositories/emailConfirmation";

export const confirmEmailConfirmationRepositorySpy = jest.fn<ConfirmEmailConfirmationContract["confirm"]>(
    async data => (
        {
            id: data.id,
            userId: 1,
            email: "random.user@test.com",
            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
            confirmedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);