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
                            name: "Folder Test User",
                            email: "folder.user@test.com",
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: "folder.user@test.com",
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
    "Folder integration tests",
    () => {
        it(
            "Should successfully create a folder",
            async () => {
                const authenticationData = {
                    email: "folder.user@test.com",
                    password: "password"
                };

                const folderData = {
                    name: "Create Folder Test"
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .post(`${baseURL}/folder/create`)
                    .send(folderData)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(201);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("name", folderData.name);
                expect(response.body).toHaveProperty("userId", userId);
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );
    }
);