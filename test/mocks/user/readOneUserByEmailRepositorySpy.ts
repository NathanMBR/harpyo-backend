import { jest } from "@jest/globals";
import { hash } from "bcryptjs";

import { ReadOneUserByEmailContract } from "@/repositories/user";

export const readOneUserByEmailRepositorySpy = jest.fn<ReadOneUserByEmailContract["readOneByEmail"]>(
    async data => {
        const hashedPassword = await hash(
            "already-existent-password",
            10
        );

        return Promise.resolve(
            data.email === "already.existent.email@test.com"
                ? {
                    id: 1,
                    name: "Already Existent User",
                    email: "already.existent.email@test.com",
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                }
                : null
        );
    }
);