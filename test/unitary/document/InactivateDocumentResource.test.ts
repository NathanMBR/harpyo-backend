import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { InactivateDocumentResource } from "@/resources/document";
import {
    findOneDocumentRepositorySpy,
    inactivateDocumentRepositorySpy
} from "@test/mocks/document";

const inactivateDocumentResource = new InactivateDocumentResource(
    {
        findOne: findOneDocumentRepositorySpy
    },

    {
        inactivate: inactivateDocumentRepositorySpy
    }
);

describe(
    "Inactivate document unitary tests",
    () => {
        it(
            "Should successfully inactivate a document",
            async () => {
                await expect(
                    inactivateDocumentResource.execute(
                        {
                            id: 1,
                            userId: 1
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findOneDocumentRepositorySpy).toHaveBeenCalledTimes(1);
                expect(inactivateDocumentRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not inactivate a document with an ID that isn't an integer",
            async () => {
                await expect(
                    inactivateDocumentResource.execute(
                        {
                            id: 3.1415,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not inactivate a document with an ID that isn't positive",
            async () => {
                await expect(
                    inactivateDocumentResource.execute(
                        {
                            id: -3,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not inactivate a document with an user ID that isn't an integer",
            async () => {
                await expect(
                    inactivateDocumentResource.execute(
                        {
                            id: 1,
                            userId: 3.1415
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not inactivate a document with an user ID that isn't positive",
            async () => {
                await expect(
                    inactivateDocumentResource.execute(
                        {
                            id: 1,
                            userId: -3
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);