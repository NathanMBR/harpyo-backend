import { jest } from "@jest/globals";

import { CountAllFoldersContract } from "@/repositories/folder";

export const countAllFoldersRepositorySpy = jest.fn<CountAllFoldersContract["countAll"]>(
    async _data => Promise.resolve(3)
);