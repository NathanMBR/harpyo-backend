import { jest } from "@jest/globals";

import { InactivateCurrentUserContract } from "@/repositories/user";

export const inactivateCurrentUserRepositorySpy = jest.fn<InactivateCurrentUserContract["inactivateCurrent"]>(
    async () => Promise.resolve()
);