import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { UpdateCurrentUserResource } from "@/resources/user";
import {
    readCurrentUserRepositorySpy,
    updateCurrentUserRepositorySpy
} from "@test/mocks/user";
import { UnauthorizedError } from "@/errors";

const updateCurrentUserResource = new UpdateCurrentUserResource(
    {
        readCurrent: readCurrentUserRepositorySpy
    },
    {
        updateCurrent: updateCurrentUserRepositorySpy
    }
);

describe(
    "Update current user unitary tests",
    () => {
        it(
            "Should successfully update an user",
            async () => {
                await expect(
                    updateCurrentUserResource.execute(
                        {
                            id: 1,
                            name: "Updated user name"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not update an user with an ID that isn't strictly positive",
            async () => {
                await expect(
                    updateCurrentUserResource.execute(
                        {
                            id: 0,
                            name: "Bad request I"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update an user with an ID that isn't an integer",
            async () => {
                await expect(
                    updateCurrentUserResource.execute(
                        {
                            id: 7.149832,
                            name: "Bad request II"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update an user with a name that has less than 3 characters",
            async () => {
                await expect(
                    updateCurrentUserResource.execute(
                        {
                            // Bad request III
                            id: 12,
                            name: "A"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a deleted user",
            async () => {
                await expect(
                    updateCurrentUserResource.execute(
                        {
                            id: 2,
                            name: "Deleted user"
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateCurrentUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update an inexistent user",
            async () => {
                await expect(
                    updateCurrentUserResource.execute(
                        {
                            id: 83,
                            name: "Inexistent user"
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(readCurrentUserRepositorySpy).toBeCalledTimes(1);
                expect(updateCurrentUserRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);