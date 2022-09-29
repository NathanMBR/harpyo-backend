import {
    describe,
    it,
    expect
} from "@jest/globals";
import { ZodError } from "zod";

import { ConfirmUserResource } from "@/resources/user";
import {
    findOneEmailConfirmationByTokenRepositorySpy,
    confirmEmailConfirmationRepositorySpy
} from "@test/mocks/emailConfirmation";
import {
    readCurrentUserRepositorySpy,
    confirmUserRepositorySpy
} from "@test/mocks/user";

const confirmUserResource = new ConfirmUserResource(
    {
        findOneByToken: findOneEmailConfirmationByTokenRepositorySpy
    },

    {
        readCurrent: readCurrentUserRepositorySpy
    },

    {
        confirm: confirmUserRepositorySpy
    },

    {
        confirm: confirmEmailConfirmationRepositorySpy
    }
);

describe(
    "Confirm user unitary tests",
    () => {
        it(
            "Should successfully confirm an user",
            async () => {
                await expect(
                    confirmUserResource.execute(
                        {
                            token: "f0ddc1aa-0037-4e4f-a76d-613880aed4fc"
                        }
                    )
                )
                    .resolves
                    .not
                    .toThrow();

                expect(findOneEmailConfirmationByTokenRepositorySpy).toHaveBeenCalledTimes(1);
                expect(readCurrentUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(confirmUserRepositorySpy).toHaveBeenCalledTimes(1);
                expect(confirmEmailConfirmationRepositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should not confirm an user with an invalid token",
            async () => {
                await expect(
                    confirmUserResource.execute(
                        {
                            token: "invalid_token"
                        }
                    )
                )
                    .rejects
                    .toThrow(ZodError);

                expect(findOneEmailConfirmationByTokenRepositorySpy).not.toHaveBeenCalled();
                expect(readCurrentUserRepositorySpy).not.toHaveBeenCalled();
                expect(confirmUserRepositorySpy).not.toHaveBeenCalled();
                expect(confirmEmailConfirmationRepositorySpy).not.toHaveBeenCalled();
            }
        );
    }
);