import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { FindOneDocumentResource } from "@/resources/document";
import { findOneDocumentRepositorySpy } from "@test/mocks/document";

const findOneDocumentResource = new FindOneDocumentResource(
    {
        findOne: findOneDocumentRepositorySpy
    }
);

describe(
    "Find one document unitary tests",
    () => {
        it(
            "Should successfully find one document",
            async () => {
                await expect(
                    findOneDocumentResource.execute(
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
            }
        );

        it(
            "Should not find one document with an ID that isn't an integer",
            async () => {
                await expect(
                    findOneDocumentResource.execute(
                        {
                            id: 3.1415,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find one document with an ID that isn't positive",
            async () => {
                await expect(
                    findOneDocumentResource.execute(
                        {
                            id: 0,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find one document with an user ID that isn't an integer",
            async () => {
                await expect(
                    findOneDocumentResource.execute(
                        {
                            id: 1,
                            userId: 3.1415
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find one document with an user ID that isn't positive",
            async () => {
                await expect(
                    findOneDocumentResource.execute(
                        {
                            id: 1,
                            userId: 0
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);