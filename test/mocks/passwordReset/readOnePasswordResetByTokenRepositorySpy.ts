import { jest } from "@jest/globals";

import { ReadOnePasswordResetByTokenContract } from "@/repositories/passwordReset";

const inMemoryPasswordResets: Array<ReadOnePasswordResetByTokenContract.Response> = [
    {
        id: 1,
        userId: 1,
        token: "20c8e4d4-ab61-4bd9-9130-acc0c79aaea6",
        resetedAt: null,
        method: "RESET",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },

    {
        id: 2,
        userId: 2,
        token: "a387b30a-66dd-4b79-b205-def82f67ea65",
        resetedAt: new Date(),
        method: "RESET",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },

    {
        id: 3,
        userId: 3,
        token: "43aecc5c-528a-449a-998a-6d3ee73b79af",
        resetedAt: new Date(),
        method: "CHANGE",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
];

export const readOnePasswordResetByTokenRepositorySpy = jest.fn<ReadOnePasswordResetByTokenContract["findOneByToken"]>(
    async data => Promise.resolve(
        inMemoryPasswordResets.find(
            passwordReset => passwordReset.token === data.token
        ) || null
    )
);