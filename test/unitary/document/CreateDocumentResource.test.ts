import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { CreateDocumentResource } from "@/resources/document";
import { createDocumentRepositorySpy } from "@test/mocks/document";

const createDocumentResource = new CreateDocumentResource(
    {
        create: createDocumentRepositorySpy
    }
);

describe(
    "Create document unitary tests",
    () => {
        it(
            "Should successfully create a document",
            async () => {
                await expect(
                    createDocumentResource.execute(
                        {
                            title: "Successfully created document",
                            text: "Lorem ipsum",
                            folderId: 1,
                            userId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(createDocumentRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not create a document with an empty title",
            async () => {
                await expect(
                    createDocumentResource.execute(
                        {
                            title: "",
                            text: "Lorem ipsum",
                            folderId: 1,
                            userId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create a document with an folder ID that isn't an integer",
            async () => {
                await expect(
                    createDocumentResource.execute(
                        {
                            title: "Non-integer folder ID",
                            text: "Lorem ipsum",
                            folderId: 3.1415,
                            userId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create a document with an folder ID that isn't positive",
            async () => {
                await expect(
                    createDocumentResource.execute(
                        {
                            title: "Non-positive folder ID",
                            text: "Lorem ipsum",
                            folderId: -3,
                            userId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create a document with an user ID that isn't an integer",
            async () => {
                await expect(
                    createDocumentResource.execute(
                        {
                            title: "Non-integer user ID",
                            text: "Lorem ipsum",
                            folderId: 1,
                            userId: 3.1415,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create a document with an user ID that isn't positive",
            async () => {
                await expect(
                    createDocumentResource.execute(
                        {
                            title: "Non-positive user ID",
                            text: "Lorem ipsum",
                            folderId: 1,
                            userId: -3,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);