/**
 * @jest-environment ./test/environment/TestEnvironment
 */

import {
    beforeAll,
    describe,
    it,
    expect,
    afterAll
} from "@jest/globals";

import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import {
    hash,
    compare
} from "bcryptjs";

import { app } from "@/server";
import { baseURL } from "@test/settings";

const prisma = new PrismaClient();
const request = supertest(app);

beforeAll(
    async () => {
        const password = await hash(
            "password",
            16
        );
        const confirmedAt = new Date();

        await prisma.$transaction(
            [
                prisma.user.create(
                    {
                        data: {
                            name: "Read Current Test User",
                            email: "read.current@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "read.current@test.com",
                                    confirmedAt
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Update Current Test User",
                            email: "update.current@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "update.current@test.com",
                                    confirmedAt
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Inactivate Current Test User",
                            email: "inactivate.current@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "inactivate.current@test.com",
                                    confirmedAt
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Authenticate Test User",
                            email: "authenticate@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "authenticate@test.com",
                                    confirmedAt
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Confirm Test User",
                            email: "confirm@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "confirm@test.com",
                                    token: "48a57e82-571c-4df1-8027-451e8e4097cd",
                                    confirmedAt: null
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Update Current Password Test User",
                            email: "update.current.password@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "update.current.password@test.com",
                                    confirmedAt
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Request Password Reset Test User",
                            email: "request.password.reset@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "request.password.reset@test.com",
                                    confirmedAt
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Update Password By Token Test User",
                            email: "update.password.by.token@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "update.password.by.token@test.com",
                                    confirmedAt
                                }
                            },

                            passwordResets: {
                                create: {
                                    token: "1047b311-24cc-4c96-87d8-d890bfd72da8",
                                    method: "RESET",
                                    resetedAt: null
                                }
                            }
                        }
                    }
                ),

                prisma.user.create(
                    {
                        data: {
                            name: "Request Email Confirmation Test User",
                            email: "request.email.confirmation@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "request.email.confirmation@test.com",
                                    confirmedAt
                                }
                            }
                        }
                    }
                )
            ]
        );
    }
);

afterAll(
    async () => {
        await prisma.$disconnect();
    }
);

describe(
    "User integration tests",
    () => {
        it(
            "Should successfully create an user",
            async () => {
                const userToCreate = {
                    name: "Create Test User",
                    email: "create.user@test.com",
                    password: "password"
                };

                const response = await request
                    .post(`${baseURL}/user/create`)
                    .send(userToCreate);

                expect(response.status).toBe(201);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("name", userToCreate.name);
                expect(response.body).toHaveProperty("email", userToCreate.email);
                expect(response.body).not.toHaveProperty("password");
                expect(response.body).not.toHaveProperty("emailConfirmation");
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully read the current user",
            async () => {
                const authenticationData = {
                    email: "read.current@test.com",
                    password: "password"
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const authenticationToken = authenticationResponse.body.token;
                const response = await request
                    .get(`${baseURL}/user/get`)
                    .set("Authorization", `Bearer ${authenticationToken}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("name", "Read Current Test User");
                expect(response.body).toHaveProperty("email", "read.current@test.com");
                expect(response.body).not.toHaveProperty("password");
                expect(response.body).not.toHaveProperty("emailConfirmation");
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully update the current user",
            async () => {
                const authenticationData = {
                    email: "update.current@test.com",
                    password: "password"
                };

                const userToUpdate = {
                    name: "Updated Test User",
                    email: "updated.user@test.com"
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const authenticationToken = authenticationResponse.body.token;
                const response = await request
                    .put(`${baseURL}/user/update`)
                    .send(userToUpdate)
                    .set("Authorization", `Bearer ${authenticationToken}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("name", userToUpdate.name);
                expect(response.body).toHaveProperty("email", authenticationData.email);
                expect(response.body.email).not.toBe(userToUpdate.email);
                expect(response.body).not.toHaveProperty("password");
                expect(response.body).not.toHaveProperty("emailConfirmation");
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body.createdAt).not.toBe(response.body.updatedAt);
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully inactivate the current user",
            async () => {
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                const authenticationData = {
                    email: "inactivate.current@test.com",
                    password: "password"
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const authenticationToken = authenticationResponse.body.token;
                const response = await request
                    .delete(`${baseURL}/user/delete`)
                    .set("Authorization", `Bearer ${authenticationToken}`);

                const userInDatabase = await prisma.user.findFirst(
                    {
                        where: {
                            id: authenticationResponse.body.user.id
                        }
                    }
                );

                expect(response.status).toBe(204);
                expect(response.body).toStrictEqual({});

                expect(userInDatabase).toBeDefined();
                expect(userInDatabase).not.toBeNull();
                expect(userInDatabase).toHaveProperty("id");
                expect(userInDatabase).toHaveProperty("name", "Inactivate Current Test User");
                expect(userInDatabase).toHaveProperty("email", authenticationData.email);
                expect(userInDatabase).toHaveProperty("password");
                expect(userInDatabase!.password).not.toBe(authenticationData.password);
                expect(userInDatabase).toHaveProperty("createdAt");
                expect(userInDatabase).toHaveProperty("updatedAt");
                expect(userInDatabase!.createdAt).not.toBe(userInDatabase!.updatedAt);
                expect(userInDatabase).toHaveProperty("deletedAt");
                expect(userInDatabase!.deletedAt).not.toBeNull();
                expect(userInDatabase!.createdAt).not.toBe(userInDatabase!.deletedAt);
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
            }
        );

        it(
            "Should successfully authenticate an user",
            async () => {
                const userToAuthenticate = {
                    email: "authenticate@test.com",
                    password: "password"
                };

                const response = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(userToAuthenticate);

                expect(response.status).toBe(200);
                expect(response.body.user).toHaveProperty("id");
                expect(response.body.user).toHaveProperty("name", "Authenticate Test User");
                expect(response.body.user).toHaveProperty("email", userToAuthenticate.email);
                expect(response.body.user).not.toHaveProperty("password");
                expect(response.body.user).not.toHaveProperty("emailConfirmation");
                expect(response.body.user).toHaveProperty("createdAt");
                expect(response.body.user).toHaveProperty("updatedAt");
                expect(response.body.user).toHaveProperty("deletedAt", null);

                expect(response.body).toHaveProperty("token");
                expect(typeof response.body.token).toBe("string");
            }
        );

        it(
            "Should successfully confirm an user account",
            async () => {
                const emailConfirmationToken = "48a57e82-571c-4df1-8027-451e8e4097cd";
                const response = await request
                    .post(`${baseURL}/user/confirm/${emailConfirmationToken}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("name", "Confirm Test User");
                expect(response.body).toHaveProperty("email", "confirm@test.com");
                expect(response.body).not.toHaveProperty("password");
                expect(response.body).not.toHaveProperty("emailConfirmation");
                expect(response.body).toHaveProperty("confirmedAt");
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully update an user password",
            async () => {
                const authenticationData = {
                    email: "update.current.password@test.com",
                    password: "password"
                };

                const passwordToUpdate = {
                    name: "New name",
                    email: "new.email@test.com",
                    currentPassword: "password",
                    newPassword: "new-password"
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const authenticationToken = authenticationResponse.body.token;
                const response = await request
                    .put(`${baseURL}/user/update-password`)
                    .send(passwordToUpdate)
                    .set("Authorization", `Bearer ${authenticationToken}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("name");
                expect(response.body.name).not.toBe(passwordToUpdate.name);
                expect(response.body).toHaveProperty("email");
                expect(response.body.email).not.toBe(passwordToUpdate.email);
                expect(response.body).not.toHaveProperty("password");
                expect(response.body).not.toHaveProperty("emailConfirmation");
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body.createdAt).not.toBe(response.body.updatedAt);
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully request a password reset",
            async () => {
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                const emailToRequestPasswordReset = "request.password.reset@test.com";

                const response = await request
                    .post(`${baseURL}/user/request-password-reset/${emailToRequestPasswordReset}`);

                const passwordResetInDatabase = await prisma.passwordReset.findFirst(
                    {
                        where: {
                            user: {
                                email: emailToRequestPasswordReset
                            },
                            deletedAt: null
                        }
                    }
                );

                expect(response.status).toBe(204);
                expect(response.body).toStrictEqual({});
                expect(passwordResetInDatabase).toBeDefined();
                expect(passwordResetInDatabase!.resetedAt).toBeNull();
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
            }
        );

        it(
            "Should successfully update an user password by token",
            async () => {
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                const passwordResetToken = "1047b311-24cc-4c96-87d8-d890bfd72da8";
                const passwordToUpdate = {
                    password: "87654321"
                };

                const response = await request
                    .put(`${baseURL}/user/reset-password/${passwordResetToken}`)
                    .send(passwordToUpdate);

                const passwordResetInDatabase = await prisma.passwordReset.findFirst(
                    {
                        where: {
                            token: passwordResetToken
                        },

                        include: {
                            user: {
                                include: {
                                    emailConfirmations: true
                                }
                            }
                        }
                    }
                );

                const doesPasswordsMatch = await compare(passwordToUpdate.password, passwordResetInDatabase!.user.password);

                expect(response.status).toBe(204);
                expect(response.body).toStrictEqual({});
                expect(passwordResetInDatabase).toBeDefined();
                expect(passwordResetInDatabase!.resetedAt).not.toBeNull();
                expect(passwordResetInDatabase!.deletedAt).toBeNull();
                expect(doesPasswordsMatch).toBe(true);
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
            }
        );

        it(
            "Should successfully request an email confirmation",
            async () => {
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                const authenticationData = {
                    email: "request.email.confirmation@test.com",
                    password: "password"
                };

                const emailConfirmationToRequest = {
                    email: "new.request.email.confirmation@test.com"
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const authenticationToken = authenticationResponse.body.token;
                const response = await request
                    .post(`${baseURL}/user/request-email-confirmation`)
                    .send(emailConfirmationToRequest)
                    .set("Authorization", `Bearer ${authenticationToken}`);

                const emailConfirmationInDatabase = await prisma.emailConfirmation.findFirst(
                    {
                        where: {
                            user: {
                                id: authenticationResponse.body.user.id
                            },
                            confirmedAt: null,
                            deletedAt: null
                        }
                    }
                );

                expect(response.status).toBe(204);
                expect(response.body).toStrictEqual({});

                expect(emailConfirmationInDatabase).toBeDefined();
                expect(emailConfirmationInDatabase!.email).toBe(emailConfirmationToRequest.email);
                expect(emailConfirmationInDatabase!.confirmedAt).toBeNull();
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
            }
        );
    }
);