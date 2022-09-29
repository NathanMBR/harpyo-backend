import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { UpdateUserEmailByTokenResource } from "@/resources/user";
import {
    findOneEmailConfirmationByTokenRepositorySpy,
    confirmEmailConfirmationRepositorySpy
} from "@test/mocks/emailConfirmation";
import { updateCurrentUserEmailRepositorySpy } from "@test/mocks/user";
import {
    UnauthorizedError,
    NotFoundError
} from "@/errors";

const updateUserEmailByTokenResource = new UpdateUserEmailByTokenResource(
    {
        findOneByToken: findOneEmailConfirmationByTokenRepositorySpy
    },

    {
        confirm: confirmEmailConfirmationRepositorySpy
    },

    {
        updateCurrentEmail: updateCurrentUserEmailRepositorySpy
    }
);

describe(
    "Update user email by token unitary tests",
    () => {
        it(
            "Should successfully update an user email by token",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 1,
                            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
                            email: "update.user.email.by.token@test.com"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findOneEmailConfirmationByTokenRepositorySpy).toHaveBeenCalledTimes(1);
                expect(confirmEmailConfirmationRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateCurrentUserEmailRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not update the user email with an user ID that isn't an integer",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 1.2345,
                            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
                            email: "non.integer.id@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update the user email with an user ID that isn't strictly positive",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: -3,
                            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
                            email: "non.positive.id@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update the user email with an empty token",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 1,
                            token: "",
                            email: "empty.token@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update the user email with an invalid token",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 1,
                            token: "invalid-token",
                            email: "invalid.token@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update the user email with an empty email",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 1,
                            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
                            email: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update the user email with an invalid email",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 1,
                            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
                            email: "invalid-email"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update the user email with a token that doesn't exist",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 1,
                            token: "bb6ecb51-30cd-4dc2-9151-aff712ebd8a6",
                            email: "not.found.token@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrow(NotFoundError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).toHaveBeenCalledTimes(1);
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update the user email if the user ID from token and authentication don't match",
            async () => {
                await expect(
                    updateUserEmailByTokenResource.execute(
                        {
                            userId: 2,
                            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc",
                            email: "non.matching.id@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).toHaveBeenCalledTimes(1);
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserEmailRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);