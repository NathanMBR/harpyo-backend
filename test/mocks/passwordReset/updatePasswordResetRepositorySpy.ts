import { jest } from "@jest/globals";

import { UpdatePasswordResetContract } from "@/repositories/passwordReset";

export const updatePasswordResetRepositorySpy = jest.fn<UpdatePasswordResetContract["update"]>(
    async data => Promise.resolve(
        {
            id: data.id,
            userId: data.id,
            token: "0a13a9b1-94a7-4f37-9899-c9afc7c70b81",
            resetedAt: null,
            method: "RESET",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);