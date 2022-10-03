import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { FindOneFolderResource } from "@/resources/folder";
import { findOneFolderRepositorySpy } from "@test/mocks/folder";

const findOneFolderResource = new FindOneFolderResource(
    {
        findOne: findOneFolderRepositorySpy
    }
);

describe(
    "Find one folder unitary tests",
    () => {
        it(
            "Should successfully find one folder",
            async () => {
                await expect(
                    findOneFolderResource.execute(
                        {
                            id: 1,
                            userId: 1
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findOneFolderRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not find one folder with an ID that isn't an integer",
            async () => {
                await expect(
                    findOneFolderResource.execute(
                        {
                            id: 3.1415,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find one folder with an ID that isn't positive",
            async () => {
                await expect(
                    findOneFolderResource.execute(
                        {
                            id: -3,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find one folder with an user ID that isn't an integer",
            async () => {
                await expect(
                    findOneFolderResource.execute(
                        {
                            id: 1,
                            userId: 3.1415
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not find one folder with an user ID that isn't positive",
            async () => {
                await expect(
                    findOneFolderResource.execute(
                        {
                            id: 1,
                            userId: -3
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);