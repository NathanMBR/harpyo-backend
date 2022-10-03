import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { UpdateFolderResource } from "@/resources/folder";
import {
    findOneFolderRepositorySpy,
    updateFolderRepositorySpy
} from "@test/mocks/folder";

const updateFolderResource = new UpdateFolderResource(
    {
        findOne: findOneFolderRepositorySpy
    },

    {
        update: updateFolderRepositorySpy
    }
);

describe(
    "Update folder unitary tests",
    () => {
        it(
            "Should successfully update a folder",
            async () => {
                await expect(
                    updateFolderResource.execute(
                        {
                            id: 1,
                            name: "Successfully updated folder",
                            userId: 1
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findOneFolderRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateFolderRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not update a folder with an ID that isn't an integer",
            async () => {
                await expect(
                    updateFolderResource.execute(
                        {
                            id: 3.1415,
                            name: "Non-integer ID",
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(updateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a folder with an ID that isn't a positive number",
            async () => {
                await expect(
                    updateFolderResource.execute(
                        {
                            id: -3,
                            name: "Non-positive ID",
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(updateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a folder with an empty name",
            async () => {
                await expect(
                    updateFolderResource.execute(
                        {
                            id: 1,
                            name: "",
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(updateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a folder with an user ID that isn't an integer",
            async () => {
                await expect(
                    updateFolderResource.execute(
                        {
                            id: 1,
                            name: "Non-integer user ID",
                            userId: 3.1415
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(updateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a folder with an user ID that isn't a positive number",
            async () => {
                await expect(
                    updateFolderResource.execute(
                        {
                            id: 1,
                            name: "Non-positive user ID",
                            userId: -3
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(updateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);