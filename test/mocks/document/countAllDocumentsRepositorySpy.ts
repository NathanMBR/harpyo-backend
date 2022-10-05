import { jest } from "@jest/globals";

import { CountAllDocumentsContract } from "@/repositories/document";

export const countAllDocumentsRepositorySpy = jest.fn<CountAllDocumentsContract["countAll"]>(
    async _data => Promise.resolve(3)
);