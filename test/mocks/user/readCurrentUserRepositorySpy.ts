import { jest } from "@jest/globals";
import { hash } from "bcryptjs";

import { ReadCurrentUserContract } from "@/repositories/user";

const getMockedUser = async (id: number):Promise<ReadCurrentUserContract.Response | null> => {
    const password = await hash("12345678", 16);

    const mockedUsers = [
        {
            id: 1,
            name: "Mocked user",
            email: "mocked.user@test.com",
            password,
            confirmedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        },

        {
            id: 2,
            name: "Deleted user",
            email: "deleted.user@test.com",
            password,
            confirmedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date()
        }
    ];

    const user = mockedUsers[id];

    return user || null;
};

export const readCurrentUserRepositorySpy = jest.fn<ReadCurrentUserContract["readCurrent"]>(
    async data => {
        const userId = data.id - 1;
        const user = await getMockedUser(userId);

        return user && !user.deletedAt ? user : null;
    }
);