import {
    it,
    describe,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { UpdateCurrentUserPasswordResource } from "@/resources/user";
import {
    readCurrentUserRepositorySpy,
    updateCurrentUserPasswordRepositorySpy
} from "@test/mocks/user";
import { createPasswordResetRepositorySpy } from "@test/mocks/passwordReset";
import {
    BadRequestError,
    UnauthorizedError
} from "@/errors";

const updateCurrentUserPasswordResource = new UpdateCurrentUserPasswordResource(
    {
        readCurrent: readCurrentUserRepositorySpy
    },
    {
        updateCurrentPassword: updateCurrentUserPasswordRepositorySpy
    },
    {
        create: createPasswordResetRepositorySpy
    }
);

describe(
    "Update current user password unitary tests",
    () => {
        it(
            "Should successfully update an user password",
            async () => {
                await expect(
                    updateCurrentUserPasswordResource.execute(
                        {
                            id: 1,
                            currentPassword: "12345678",
                            newPassword: "87654321"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateCurrentUserPasswordRepositorySpy).toHaveBeenCalledTimes(1);
                expect(createPasswordResetRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not update an user password with an ID that isn't strictly positive",
            async () => {
                await expect(
                    updateCurrentUserPasswordResource.execute(
                        {
                            id: 0,
                            currentPassword: "12345678",
                            newPassword: "87654321"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserPasswordRepositorySpy).not.toHaveBeenCalled();
                expect(createPasswordResetRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update an user with a password that has less than 8 characters",
            async () => {
                await expect(
                    updateCurrentUserPasswordResource.execute(
                        {
                            id: 1,
                            currentPassword: "1234567",
                            newPassword: "87654321"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserPasswordRepositorySpy).not.toHaveBeenCalled();
                expect(createPasswordResetRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update a not found user",
            async () => {
                await expect(
                    updateCurrentUserPasswordResource.execute(
                        {
                            id: 27,
                            currentPassword: "12345678",
                            newPassword: "87654321"
                        }
                    )
                )
                    .rejects
                    .toThrow(UnauthorizedError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateCurrentUserPasswordRepositorySpy).not.toHaveBeenCalled();
                expect(createPasswordResetRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update an user password with an invalid current password",
            async () => {
                await expect(
                    updateCurrentUserPasswordResource.execute(
                        {
                            id: 1,
                            currentPassword: "87654321",
                            newPassword: "12345678"
                        }
                    )
                )
                    .rejects
                    .toThrow(BadRequestError);

                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateCurrentUserPasswordRepositorySpy).not.toHaveBeenCalled();
                expect(createPasswordResetRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);