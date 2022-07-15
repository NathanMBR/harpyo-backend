import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { CreateUserResource } from "@/resources/user";
import {
    readOneUserByEmailRepositorySpy,
    createUserRepositorySpy
} from "@test/mocks/user";
import { BadRequestError } from "@/errors";

const createUserResource = new CreateUserResource(
    {
        readOneByEmail: readOneUserByEmailRepositorySpy
    },
    {
        create: createUserRepositorySpy
    }
);

describe(
    "Create user unitary tests",
    () => {
        it(
            "Should successfully create an user",
            async () => {
                await expect(
                    createUserResource.execute(
                        {
                            name: "Successfully created user",
                            email: "successfully.created.user@test.com",
                            password: "12345678"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
                expect(createUserRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not create an user with an already existent email",
            async () => {
                await expect(
                    createUserResource.execute(
                        {
                            name: "Already existent user",
                            email: "already.existent.email@test.com",
                            password: "12345678"
                        }
                    )
                )
                    .rejects
                    .toThrow(BadRequestError);

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
                expect(createUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create an user with a name that has less than 3 characters",
            async () => {
                await expect(
                    createUserResource.execute(
                        {
                            name: "AB",
                            email: "email@test.com",
                            password: "12345678"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create an user with an email that's in a bad format",
            async () => {
                await expect(
                    createUserResource.execute(
                        {
                            name: "ABC",
                            email: "bad-format",
                            password: "12345678"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createUserRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not create an user with a password that has less than 8 characters",
            async () => {
                await expect(
                    createUserResource.execute(
                        {
                            name: "ABCDEFGH",
                            email: "email@test.com",
                            password: "1234"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createUserRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);