import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { InactivateCurrentUserResource } from "@/resources/user";
import {
    readCurrentUserRepositorySpy,
    inactivateCurrentUserRepositorySpy
} from "@test/mocks/user";
import { UnauthorizedError } from "@/errors";

const inactivateCurrentUserResource = new InactivateCurrentUserResource(
    {
        readCurrent: readCurrentUserRepositorySpy
    },
    {
        inactivateCurrent: inactivateCurrentUserRepositorySpy
    }
);

describe(
    "Inactivate current user unitary tests",
    () => {
        it(
            "Should successfully inactivate an user",
            async () => {
                await expect(
                    inactivateCurrentUserResource.execute(
                        {
                            id: 1
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(inactivateCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not inactivate an user with an ID that isn't strictly positive",
            async () => {
                await expect(
                    inactivateCurrentUserResource.execute(
                        {
                            id: 0
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(0);
                expect(inactivateCurrentUserRepositorySpy).toHaveBeenCalledTimes(0);
            }
        );

        it(
            "Should not inactivate an user with an ID that isn't an integer",
            async () => {
                await expect(
                    inactivateCurrentUserResource.execute(
                        {
                            id: 7.149832
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(0);
                expect(inactivateCurrentUserRepositorySpy).toHaveBeenCalledTimes(0);
            }
        );

        it(
            "Should not inactivate an user with an ID that doesn't exist",
            async () => {
                await expect(
                    inactivateCurrentUserResource.execute(
                        {
                            id: 7
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(inactivateCurrentUserRepositorySpy).toHaveBeenCalledTimes(0);
            }
        );

        it(
            "Should not inactivate an user that is already inactivated",
            async () => {
                await expect(
                    inactivateCurrentUserResource.execute(
                        {
                            id: 2
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(inactivateCurrentUserRepositorySpy).toHaveBeenCalledTimes(0);
            }
        );
    }
);