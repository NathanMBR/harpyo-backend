import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { UpdateUserPasswordByTokenResource } from "@/resources/user";
import {
    readOnePasswordResetByTokenRepositorySpy,
    updatePasswordResetRepositorySpy
} from "@test/mocks/passwordReset";
import {
    readCurrentUserRepositorySpy,
    updateCurrentUserPasswordRepositorySpy
} from "@test/mocks/user";

const updateUserPasswordByTokenResource = new UpdateUserPasswordByTokenResource(
    {
        findOneByToken: readOnePasswordResetByTokenRepositorySpy
    },

    {
        update: updatePasswordResetRepositorySpy
    },

    {
        readCurrent: readCurrentUserRepositorySpy
    },

    {
        updateCurrentPassword: updateCurrentUserPasswordRepositorySpy
    }
);

describe(
    "Update user password by token unitary tests",
    () => {
        it(
            "Should successfully update an user password by token",
            async () => {
                await expect(
                    updateUserPasswordByTokenResource.execute(
                        {
                            token: "20c8e4d4-ab61-4bd9-9130-acc0c79aaea6",
                            password: "87654321"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(readOnePasswordResetByTokenRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updatePasswordResetRepositorySpy).toHaveBeenCalledTimes(1);
                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(updateCurrentUserPasswordRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not update an user password with an invalid token",
            async () => {
                await expect(
                    updateUserPasswordByTokenResource.execute(
                        {
                            token: "invalid-token",
                            password: "87654321"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOnePasswordResetByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(updatePasswordResetRepositorySpy).not.toHaveBeenCalled();
                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserPasswordRepositorySpy).not.toHaveBeenCalled();
            }
        );

        it(
            "Should not update an user password with an password that has less than 8 characters",
            async () => {
                await expect(
                    updateUserPasswordByTokenResource.execute(
                        {
                            token: "20c8e4d4-ab61-4bd9-9130-acc0c79aaea6",
                            password: "12345"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(readOnePasswordResetByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(updatePasswordResetRepositorySpy).not.toHaveBeenCalled();
                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(updateCurrentUserPasswordRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);