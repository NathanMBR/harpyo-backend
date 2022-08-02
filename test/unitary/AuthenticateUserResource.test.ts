import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { AuthenticateUserResource } from "@/resources/user";
import {
    readOneUserByEmailRepositorySpy
} from "@test/mocks/user";
import { BadRequestError } from "@/errors";

const authenticateUserResource = new AuthenticateUserResource(
    {
        readOneByEmail: readOneUserByEmailRepositorySpy
    }
);

describe(
    "Authenticate user unitary tests",
    () => {
        it(
            "Should successfully authenticate an user",
            async () => {
                await expect(
                    authenticateUserResource.execute(
                        {
                            email: "already.existent.email@test.com",
                            password: "already-existent-password"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not authenticate an user with an invalid email",
            async () => {
                await expect(
                    authenticateUserResource.execute(
                        {
                            email: "invalid-email-format",
                            password: "already-existent-password"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not authenticate an inexistent user",
            async () => {
                await expect(
                    authenticateUserResource.execute(
                        {
                            email: "inexistent.email@test.com",
                            password: "random-password"
                        }
                    )
                )
                    .rejects
                    .toThrow(BadRequestError);

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not authenticate an user with a non-matching password",
            async () => {
                await expect(
                    authenticateUserResource.execute(
                        {
                            email: "already.existent.email@test.com",
                            password: "non-matching-password"
                        }
                    )
                )
                    .rejects
                    .toThrow(BadRequestError);

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );
    }
);