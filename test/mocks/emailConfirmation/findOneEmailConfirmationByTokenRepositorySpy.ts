import { jest } from "@jest/globals";

import { FindOneEmailConfirmationByTokenContract } from "@/repositories/emailConfirmation";

export const findOneEmailConfirmationByTokenRepositorySpy = jest.fn<FindOneEmailConfirmationByTokenContract["findOneByToken"]>(
    async data => Promise.resolve(
        {
            id: 1,
            userId: 1,
            email: "random.user@test.com",
            token: data.token,
            confirmedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);