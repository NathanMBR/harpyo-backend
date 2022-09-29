import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";
import {
    BadRequestError,
    NotFoundError
} from "@/errors";

import { RequestEmailConfirmationResource } from "@/resources/user";
import {
    readCurrentUserRepositorySpy,
    readOneUserByEmailRepositorySpy,
    sendEmailConfirmationEmailServiceSpy
} from "@test/mocks/user";
import { createEmailConfirmationRepositorySpy } from "@test/mocks/emailConfirmation";

const requestEmailConfirmationResource = new RequestEmailConfirmationResource(
    {
        readCurrent: readCurrentUserRepositorySpy
    },

    {
        readOneByEmail: readOneUserByEmailRepositorySpy
    },

    {
        create: createEmailConfirmationRepositorySpy
    },

    {
        send: sendEmailConfirmationEmailServiceSpy
    }
);

describe(
    "Request email confirmation unitary tests",
    () => {
        it(
            "Should successfully request an email confirmation",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: 1,
                            email: "new.mocked.user@test.com"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
                expect(createEmailConfirmationRepositorySpy).toHaveBeenCalledTimes(1);
                expect(sendEmailConfirmationEmailServiceSpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not request an email confirmation with an ID that isn't an integer",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: 1.23456,
                            email: "non.integer@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrowError(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(sendEmailConfirmationEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not request an email confirmation with an ID that isn't positive",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: -3,
                            email: "non.positive@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrowError(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(sendEmailConfirmationEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not request an email confirmation with an empty email",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: 1,
                            email: ""
                        }
                    )
                )
                    .rejects
                    .toThrowError(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(sendEmailConfirmationEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not request an email confirmation with an invalid email",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: 1,
                            email: "invalid-email"
                        }
                    )
                )
                    .rejects
                    .toThrowError(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(sendEmailConfirmationEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not request an email confirmation with an user ID that doesn't exist",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: 123,
                            email: "non.existent@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrowError(NotFoundError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(sendEmailConfirmationEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not request an email confirmation for the current email",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: 1,
                            email: "mocked.user@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrowError(BadRequestError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(readOneUserByEmailRepositorySpy).not.toHaveBeenCalled();
                expect(createEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(sendEmailConfirmationEmailServiceSpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not request an email confirmation for an already existent email",
            async () => {
                await expect(
                    requestEmailConfirmationResource.execute(
                        {
                            userId: 1,
                            email: "already.existent.email@test.com"
                        }
                    )
                )
                    .rejects
                    .toThrowError(BadRequestError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
                expect(createEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
                expect(sendEmailConfirmationEmailServiceSpy).not.toHaveBeenCalled();
            }
        );
    }
);