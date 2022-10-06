import { jest } from "@jest/globals";

import { InactivateDocumentContract } from "@/repositories/document";

export const inactivateDocumentRepositorySpy = jest.fn<InactivateDocumentContract["inactivate"]>(
    async _data => Promise.resolve()
);