import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { FindAllFoldersResource } from "@/resources/folder";
import {
    findAllFoldersRepositorySpy,
    countAllFoldersRepositorySpy
} from "@test/mocks/folder";

const findAllFoldersResource = new FindAllFoldersResource(
    {
        findAll: findAllFoldersRepositorySpy
    },

    {
        countAll: countAllFoldersRepositorySpy
    }
);

describe(
    "Find all folders unitary tests",
    () => {
        it(
            "Should successfully find all folders",
            async () => {
                await expect(
                    findAllFoldersResource.execute(
                        {
                            userId: 1,
                            page: 1,
                            quantity: 10,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findAllFoldersRepositorySpy).toHaveBeenCalledTimes(1);
                expect(countAllFoldersRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not find all folders with an user ID that isn't an integer",
            async () => {
                await expect(
                    findAllFoldersResource.execute(
                        {
                            userId: 3.1415,
                            page: 1,
                            quantity: 10,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllFoldersRepositorySpy).not.toHaveBeenCalled();
                expect(countAllFoldersRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all folders with an user ID that isn't positive",
            async () => {
                await expect(
                    findAllFoldersResource.execute(
                        {
                            userId: -3,
                            page: 1,
                            quantity: 10,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllFoldersRepositorySpy).not.toHaveBeenCalled();
                expect(countAllFoldersRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all folders with a page that isn't an integer",
            async () => {
                await expect(
                    findAllFoldersResource.execute(
                        {
                            userId: 1,
                            page: 3.1415,
                            quantity: 10,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllFoldersRepositorySpy).not.toHaveBeenCalled();
                expect(countAllFoldersRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all folders with a page that isn't positive",
            async () => {
                await expect(
                    findAllFoldersResource.execute(
                        {
                            userId: 1,
                            page: -3,
                            quantity: 10,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllFoldersRepositorySpy).not.toHaveBeenCalled();
                expect(countAllFoldersRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all folders with a quantity that isn't an integer",
            async () => {
                await expect(
                    findAllFoldersResource.execute(
                        {
                            userId: 1,
                            page: 1,
                            quantity: 3.1415,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllFoldersRepositorySpy).not.toHaveBeenCalled();
                expect(countAllFoldersRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find all folders with a quantity that isn't positive",
            async () => {
                await expect(
                    findAllFoldersResource.execute(
                        {
                            userId: 1,
                            page: 1,
                            quantity: -3,
                            orderColumn: undefined,
                            orderBy: "asc",
                            search: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findAllFoldersRepositorySpy).not.toHaveBeenCalled();
                expect(countAllFoldersRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);