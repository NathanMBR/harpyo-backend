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
    email: "folder.user@test.com",
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
                            name: "Folder Test User",
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

                prisma.folder.createMany(
                    {
                        skipDuplicates: false,
                        data: [
                            {
                                name: "Find Test Folder 1",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 2",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 3",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 4",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 5",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 6",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 7",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 8",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 9",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 10",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 11",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 12",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 13",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 14",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 15",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 16",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 17",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 18",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 19",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 20",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 21",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 22",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 23",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 24",
                                userId: 1
                            },

                            {
                                name: "Find Test Folder 25",
                                userId: 1
                            }
                        ]
                    }
                ),

                prisma.folder.create(
                    {
                        data: {
                            name: "Inactivate Folder Test",
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
    "Folder integration tests",
    () => {
        it(
            "Should successfully create a folder",
            async () => {
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

        it(
            "Should successfully find all folders",
            async () => {
                interface Folder {
                    id: number;
                    name: string;
                    userId: number;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                }

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .get(`${baseURL}/folder/all?search=Test Folder&orderColumn=id&orderBy=desc&page=2&quantity=6`)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("quantityPerPage", 6);
                expect(response.body).toHaveProperty("totalQuantity", 25);
                expect(response.body).toHaveProperty("currentPage", 2);
                expect(response.body).toHaveProperty("lastPage", 5);
                expect(response.body).toHaveProperty("data");
                expect(response.body.data).toHaveLength(6);
                expect(response.body.data.every((folder: Folder) => !!folder.id)).toBe(true);
                expect(response.body.data.every((folder: Folder) => folder.name.startsWith("Find Test Folder"))).toBe(true);
                expect(response.body.data.every((folder: Folder) => folder.userId === userId)).toBe(true);
                expect(response.body.data.every((folder: Folder) => !!folder.createdAt)).toBe(true);
                expect(response.body.data.every((folder: Folder) => !!folder.updatedAt)).toBe(true);
                expect(response.body.data.every((folder: Folder) => !folder.deletedAt)).toBe(true);
            }
        );

        it(
            "Should successfully find one folder",
            async () => {
                const folderId = 3;

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .get(`${baseURL}/folder/get/${folderId}`)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id", folderId);
                expect(response.body).toHaveProperty("name", "Find Test Folder 3");
                expect(response.body).toHaveProperty("userId", userId);
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully update a folder",
            async () => {
                const folderId = 7;

                const folderData = {
                    name: "Updated Folder Test"
                };

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .put(`${baseURL}/folder/update/${folderId}`)
                    .send(folderData)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id", folderId);
                expect(response.body).toHaveProperty("name", folderData.name);
                expect(response.body.name).not.toBe("Find Test Folder 7");
                expect(response.body).toHaveProperty("userId", userId);
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully inactivate a folder",
            async () => {
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                const folderId = 26;

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .delete(`${baseURL}/folder/inactivate/${folderId}`)
                    .set("Authorization", `Bearer ${token}`);

                const folderInDatabase = await prisma.folder.findFirst(
                    {
                        where: {
                            id: folderId
                        }
                    }
                );

                expect(response.status).toBe(204);
                expect(response.body).toStrictEqual({});
                expect(folderInDatabase).toBeDefined();
                expect(folderInDatabase).toHaveProperty("id", folderId);
                expect(folderInDatabase).toHaveProperty("name", "Inactivate Folder Test");
                expect(folderInDatabase).toHaveProperty("userId", userId);
                expect(folderInDatabase).toHaveProperty("createdAt");
                expect(folderInDatabase).toHaveProperty("updatedAt");
                expect(folderInDatabase).toHaveProperty("deletedAt");
                expect(folderInDatabase!.deletedAt).not.toBe(null);
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
            }
        );
    }
);