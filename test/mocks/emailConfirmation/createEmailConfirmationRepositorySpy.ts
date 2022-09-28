import { jest } from "@jest/globals";

import { CreateEmailConfirmationContract } from "@/repositories/emailConfirmation";

export const createEmailConfirmationRepositorySpy = jest.fn<CreateEmailConfirmationContract["create"]>(
    async data => Promise.resolve(
        {
            id: 1,
            userId: data.userId,
            email: data.email,
            token: "e7696613-e8df-4120-aead-7ca31a0758e4",
            confirmedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);