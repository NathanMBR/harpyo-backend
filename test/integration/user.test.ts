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
import { hash } from "bcryptjs";

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
    }
);