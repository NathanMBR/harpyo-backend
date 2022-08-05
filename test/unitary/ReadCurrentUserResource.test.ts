import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { ReadCurrentUserResource } from "@/resources/user";
import { readCurrentUserRepositorySpy } from "@test/mocks/user";
import { UnauthorizedError } from "@/errors";

const readCurrentUserResource = new ReadCurrentUserResource(
    {
        readCurrent: readCurrentUserRepositorySpy
    }
);

describe(
    "Read current user unitary tests",
    () => {
        it(
            "Should successfully read an user",
            async () => {
                await expect(
                    readCurrentUserResource.execute(
                        {
                            id: 1
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not read an user with an ID that isn't strictly positive",
            async () => {
                await expect(
                    readCurrentUserResource.execute(
                        {
                            id: 0
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not read an user with an ID that isn't an integer",
            async () => {
                await expect(
                    readCurrentUserResource.execute(
                        {
                            id: 3.275
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not read a deleted user",
            async () => {
                await expect(
                    readCurrentUserResource.execute(
                        {
                            id: 2
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not read an inexistent user",
            async () => {
                await expect(
                    readCurrentUserResource.execute(
                        {
                            id: 5
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );
    }
);