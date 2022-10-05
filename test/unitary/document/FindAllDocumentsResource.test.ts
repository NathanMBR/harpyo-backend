import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { FindAllDocumentsResource } from "@/resources/document";
import {
    findAllDocumentsRepositorySpy,
    countAllDocumentsRepositorySpy
} from "@test/mocks/document";

const findAllDocumentsResource = new FindAllDocumentsResource(
    {
        findAll: findAllDocumentsRepositorySpy
    },

    {
        countAll: countAllDocumentsRepositorySpy
    }
);

describe(
    "Find all documents unitary tests",
    () => {
        it(
            "Should successfully find all documents",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: 1,
                            page: 1,
                            quantity: 10,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findAllDocumentsRepositorySpy).toHaveBeenCalledTimes(1);
                expect(countAllDocumentsRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should successfully find all documents with the minimum required values",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: undefined,
                            page: undefined,
                            quantity: undefined,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findAllDocumentsRepositorySpy).toHaveBeenCalledTimes(1);
                expect(countAllDocumentsRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not find all documents with an user ID that isn't an integer",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 3.1415,
                            folderId: 1,
                            page: 1,
                            quantity: 10,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all documents with an user ID that isn't positive",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: -3,
                            folderId: 1,
                            page: 1,
                            quantity: 10,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all documents with a folder ID that isn't an integer",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: 3.1415,
                            page: 1,
                            quantity: 10,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all documents with a folder ID that isn't positive",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: -3,
                            page: 1,
                            quantity: 10,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all documents with a page that isn't an integer",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: 1,
                            page: 3.1415,
                            quantity: 10,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all documents with a page that isn't positive",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: 1,
                            page: -3,
                            quantity: 10,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all documents with a quantity that isn't an integer",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: 1,
                            page: 1,
                            quantity: 3.1415,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all documents with a quantity that isn't positive",
            async () => {
                await expect(
                    findAllDocumentsResource.execute(
                        {
                            userId: 1,
                            folderId: 1,
                            page: 1,
                            quantity: -3,
                            orderColumn: "id",
                            orderBy: "asc",
                            search: "search-value"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllDocumentsRepositorySpy).not.toHaveBeenCalled();
                expect(countAllDocumentsRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);