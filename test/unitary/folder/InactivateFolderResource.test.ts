import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { InactivateFolderResource } from "@/resources/folder";
import {
    findOneFolderRepositorySpy,
    inactivateFolderRepositorySpy
} from "@test/mocks/folder";

const inactivateFolderResource = new InactivateFolderResource(
    {
        findOne: findOneFolderRepositorySpy
    },

    {
        inactivate: inactivateFolderRepositorySpy
    }
);

describe(
    "Inactivate folder unitary tests",
    () => {
        it(
            "Should successfully inactivate a folder",
            async () => {
                await expect(
                    inactivateFolderResource.execute(
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
                expect(inactivateFolderRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not inactivate a folder with an ID that isn't an integer",
            async () => {
                await expect(
                    inactivateFolderResource.execute(
                        {
                            id: 3.1415,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not inactivate a folder with an ID that isn't positive",
            async () => {
                await expect(
                    inactivateFolderResource.execute(
                        {
                            id: -3,
                            userId: 1
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not inactivate a folder with an user ID that isn't an integer",
            async () => {
                await expect(
                    inactivateFolderResource.execute(
                        {
                            id: 1,
                            userId: 3.1415
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not inactivate a folder with an user ID that isn't positive",
            async () => {
                await expect(
                    inactivateFolderResource.execute(
                        {
                            id: 1,
                            userId: -3
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneFolderRepositorySpy).not.toHaveBeenCalled();
                expect(inactivateFolderRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);