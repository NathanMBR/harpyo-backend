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

const authenticationData = {
    email: "document.user@test.com",
    password: "password"
};

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
                            name: "Document Test User",
                            email: authenticationData.email,
                            password,
                            confirmedAt,

                            emailConfirmations: {
                                create: {
                                    email: authenticationData.email,
                                    confirmedAt
                                }
                            }
                        }
                    }
                ),

                prisma.folder.create(
                    {
                        data: {
                            name: "Document Test Folder",
                            userId: 1
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
    "Document integration tests",
    () => {
        it(
            "Should successfully create a document",
            async () => {
                const documentData = {
                    title: "Create Document Test",
                    text: "Lorem ipsum",
                    folderId: 1,
                    isEncrypted: true
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .post(`${baseURL}/document/create`)
                    .send(documentData)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(201);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("title", documentData.title);
                expect(response.body).toHaveProperty("text", documentData.text);
                expect(response.body).toHaveProperty("folderId", documentData.folderId);
                expect(response.body).toHaveProperty("userId", userId);
                expect(response.body).toHaveProperty("isEncrypted", documentData.isEncrypted);
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );
    }
);