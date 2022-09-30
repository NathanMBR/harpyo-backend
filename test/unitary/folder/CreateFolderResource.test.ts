import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { CreateFolderResource } from "@/resources/folder";
import { createFolderRepositorySpy } from "@test/mocks/folder";

const createFolderResource = new CreateFolderResource(
    {
        create: createFolderRepositorySpy
    }
);

describe(
    "Create folder unitary tests",
    () => {
        it(
            "Should successfully create a folder",
            async () => {
                await expect(
                    createFolderResource.execute(
                        {
                            name: "Successfully created folder",
                            userId: 1
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(createFolderRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not create a folder with an empty name",
            async () => {
                await expect(
                    createFolderResource.execute(
                        {
                            name: "",
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create a folder with an user ID that isn't positive",
            async () => {
                await expect(
                    createFolderResource.execute(
                        {
                            name: "Non-positive user ID",
                            userId: -3
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create a folder with an user ID that isn't an integer",
            async () => {
                await expect(
                    createFolderResource.execute(
                        {
                            name: "Non-integer user ID",
                            userId: 3.1415
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(createFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);