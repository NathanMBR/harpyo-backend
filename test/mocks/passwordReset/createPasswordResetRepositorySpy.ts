import { jest } from "@jest/globals";

import { CreatePasswordResetContract } from "@/repositories/passwordReset";

export const createPasswordResetRepositorySpy = jest.fn<CreatePasswordResetContract["create"]>(
    async data => Promise.resolve(
        {
            id: 1,
            userId: data.userId,
            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
            resetedAt: data.resetedAt,
            method: data.method,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    )
);