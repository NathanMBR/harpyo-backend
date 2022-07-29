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
        const password = await hash("password", 16);

        await prisma.user.create(
            {
                data: {
                    name: "Test User",
                    email: "user@test.com",
                    password,

                    emailConfirmations: {
                        create: {
                            email: "",
                            confirmedAt: null
                        }
                    }
                }
            }
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
                    name: "Create user test",
                    email: "create_user@test.com",
                    password: "12345678"
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
    }
);