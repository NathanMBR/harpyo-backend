import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { UpdateDocumentResource } from "@/resources/document";
import {
    findOneDocumentRepositorySpy,
    updateDocumentRepositorySpy
} from "@test/mocks/document";

const updateDocumentResource = new UpdateDocumentResource(
    {
        findOne: findOneDocumentRepositorySpy
    },

    {
        update: updateDocumentRepositorySpy
    }
);

describe(
    "Update document unitary tests",
    () => {
        it(
            "Should successfully update a document",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: 1,
                            title: "Successfully updated document",
                            text: "Lorem ipsum",
                            userId: 1,
                            folderId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findOneDocumentRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateDocumentRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not update a document with an ID that isn't an integer",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: 3.1415,
                            title: "Non-integer ID",
                            text: "Lorem ipsum",
                            userId: 1,
                            folderId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(updateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a document with an ID that isn't positive",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: -1,
                            title: "Non-positive ID",
                            text: "Lorem ipsum",
                            userId: 1,
                            folderId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(updateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a document with an empty title",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: 1,
                            title: "",
                            text: "Lorem ipsum",
                            userId: 1,
                            folderId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(updateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a document with a folder ID that isn't an integer",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: 1,
                            title: "Non-integer folder ID",
                            text: "Lorem ipsum",
                            userId: 1,
                            folderId: 3.1415,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(updateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a document with a folder ID that isn't positive",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: 1,
                            title: "Non-positive folder ID",
                            text: "Lorem ipsum",
                            userId: 1,
                            folderId: -1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(updateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a document with an user ID that isn't an integer",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: 1,
                            title: "Non-integer user ID",
                            text: "Lorem ipsum",
                            userId: 3.1415,
                            folderId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(updateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a document with an user ID that isn't positive",
            async () => {
                await expect(
                    updateDocumentResource.execute(
                        {
                            id: 1,
                            title: "Non-positive user ID",
                            text: "Lorem ipsum",
                            userId: -1,
                            folderId: 1,
                            isEncrypted: false
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneDocumentRepositorySpy).not.toHaveBeenCalled();
                expect(updateDocumentRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);