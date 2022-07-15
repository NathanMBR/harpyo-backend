import { jest } from "@jest/globals";

import { ReadCurrentUserContract } from "@/repositories/user";

const mockedUsers: Array<ReadCurrentUserContract.Response> = [
    {
        id: 1,
        name: "Mocked user",
        email: "mocked.user@test.com",
        password: "aiojufdha984i54o4u94dhnjI94U94HOI4h9a4iufg49s84i98u49f8g98h9I84U8HO4I9Ub",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: 2,
        name: "Deleted user",
        email: "deleted.user@test.com",
        password: "aiojufdha984i54o4u94dhnjI94U94HOI4h9a4iufg49s84i98u49f8g98h9I84U8HO4I9Uc",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
    }
];

export const readCurrentUserRepositorySpy = jest.fn<ReadCurrentUserContract["readCurrent"]>(
    async data => Promise.resolve(
        mockedUsers[data.id] || null
    )
);