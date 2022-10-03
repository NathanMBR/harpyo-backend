import { jest } from "@jest/globals";

import { InactivateFolderContract } from "@/repositories/folder";

export const inactivateFolderRepositorySpy = jest.fn<InactivateFolderContract["inactivate"]>(
    async _data => Promise.resolve()
);