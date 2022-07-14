import {
    describe,
    it,
    expect
} from "@jest/globals";

import { CreateUserResource } from "@/resources/user";
import {
    readOneUserByEmailRepositorySpy,
    createUserRepositorySpy
} from "@test/mocks/user";

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
                    .toThrow();

                expect(readOneUserByEmailRepositorySpy).toHaveBeenCalled();
            }
        );
    }
);