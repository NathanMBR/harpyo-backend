import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { RequestPasswordResetResource } from "@/resources/user";
import {
    readOneUserByEmailRepositorySpy,
    sendPasswordResetRequestEmailServiceSpy
} from "@test/mocks/user";
import { createPasswordResetRepositorySpy } from "@test/mocks/passwordReset";

const requestPasswordResetResource = new RequestPasswordResetResource(
    {
        readOneByEmail: readOneUserByEmailRepositorySpy
    },

    {
        create: createPasswordResetRepositorySpy
    },

    {
        send: sendPasswordResetRequestEmailServiceSpy
    }
);

describe(
    "Request password reset unitary tests",
    () => {
        it(
            "Should successfully request a password reset",
            async () => {
                await expect(
                    requestPasswordResetResource.execute(
                        {
                            email: "already.existent.email@test.com"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
                expect(createPasswordResetRepositorySpy).toHaveBeenCalledTimes(1);
                expect(sendPasswordResetRequestEmailServiceSpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not request a password reset with an empty email",
            async () => {
                await expect(
                    requestPasswordResetResource.execute(
                        {
                            email: ""
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createPasswordResetRepositorySpy).not.toHaveBeenCalled();
                expect(sendPasswordResetRequestEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not request a password reset with an invalid email",
            async () => {
                await expect(
                    requestPasswordResetResource.execute(
                        {
                            email: "invalid-email"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createPasswordResetRepositorySpy).not.toHaveBeenCalled();
                expect(sendPasswordResetRequestEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should fakely request a password reset with an unexistent email",
            async () => {
                await expect(
                    requestPasswordResetResource.execute(
                        {
                            email: "unregistered.email@test.com"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
                expect(createPasswordResetRepositorySpy).not.toHaveBeenCalled();
                expect(sendPasswordResetRequestEmailServiceSpy).not.toHaveBeenCalled();
            }
        );
    }
);