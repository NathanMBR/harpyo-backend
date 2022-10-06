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
import { DocumentInterface } from "@/interfaces";

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
                ),

                prisma.document.createMany(
                    {
                        skipDuplicates: false,
                        data: [
                            {
                                title: "Find Test Document 1",
                                text: "Lorem Ipsum 1",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 2",
                                text: "Lorem Ipsum 2",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 3",
                                text: "Lorem Ipsum 3",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 4",
                                text: "Lorem Ipsum 4",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 5",
                                text: "Lorem Ipsum 5",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 6",
                                text: "Lorem Ipsum 6",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 7",
                                text: "Lorem Ipsum 7",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 8",
                                text: "Lorem Ipsum 8",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 9",
                                text: "Lorem Ipsum 9",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 10",
                                text: "Lorem Ipsum 10",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 11",
                                text: "Lorem Ipsum 11",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 12",
                                text: "Lorem Ipsum 12",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 13",
                                text: "Lorem Ipsum 13",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 14",
                                text: "Lorem Ipsum 14",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 15",
                                text: "Lorem Ipsum 15",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 16",
                                text: "Lorem Ipsum 16",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 17",
                                text: "Lorem Ipsum 17",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 18",
                                text: "Lorem Ipsum 18",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 19",
                                text: "Lorem Ipsum 19",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 20",
                                text: "Lorem Ipsum 20",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 21",
                                text: "Lorem Ipsum 21",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 22",
                                text: "Lorem Ipsum 22",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 23",
                                text: "Lorem Ipsum 23",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 24",
                                text: "Lorem Ipsum 24",
                                userId: 1,
                                folderId: null,
                                isEncrypted: false
                            },

                            {
                                title: "Find Test Document 25",
                                text: "Lorem Ipsum 25",
                                userId: 1,
                                folderId: 1,
                                isEncrypted: false
                            }
                        ]
                    }
                ),

                prisma.document.create(
                    {
                        data: {
                            title: "Inactivate Document Test",
                            text: "Lorem Ipsum",
                            userId: 1,
                            folderId: null,
                            isEncrypted: false
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

        it(
            "Should successfully list all documents",
            async () => {
                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .get(`${baseURL}/document/all?search=Test Document&orderColumn=id&orderBy=desc&page=2&quantity=6`)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("quantityPerPage", 6);
                expect(response.body).toHaveProperty("totalQuantity", 25);
                expect(response.body).toHaveProperty("currentPage", 2);
                expect(response.body).toHaveProperty("lastPage", 5);
                expect(response.body).toHaveProperty("data");
                expect(Array.isArray(response.body.data)).toBe(true);
                expect(response.body.data).toHaveLength(6);
                expect(response.body.data.every((document: DocumentInterface) => !!document.id)).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => document.title.startsWith("Find Test Document"))).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => document.text?.startsWith("Lorem Ipsum"))).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => document.userId === userId)).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => document.folderId === 1 || document.folderId === null)).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => document.isEncrypted === false)).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => !!document.createdAt)).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => !!document.updatedAt)).toBe(true);
                expect(response.body.data.every((document: DocumentInterface) => !document.deletedAt)).toBe(true);
            }
        );

        it(
            "Should successfully find one document",
            async () => {
                const folderId = 3;

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .get(`${baseURL}/document/get/${folderId}`)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id", folderId);
                expect(response.body).toHaveProperty("title", "Find Test Document 3");
                expect(response.body).toHaveProperty("text", "Lorem Ipsum 3");
                expect(response.body).toHaveProperty("userId", userId);
                expect(response.body).toHaveProperty("folderId", 1);
                expect(response.body).toHaveProperty("isEncrypted", false);
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully update a document",
            async () => {
                const documentId = 7;

                const documentData = {
                    title: "Update Document Test",
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
                    .put(`${baseURL}/document/update/${documentId}`)
                    .send(documentData)
                    .set("Authorization", `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id", documentId);
                expect(response.body).toHaveProperty("title", documentData.title);
                expect(response.body).toHaveProperty("text", documentData.text);
                expect(response.body).toHaveProperty("userId", userId);
                expect(response.body).toHaveProperty("folderId", documentData.folderId);
                expect(response.body).toHaveProperty("isEncrypted", documentData.isEncrypted);
                expect(response.body).toHaveProperty("createdAt");
                expect(response.body).toHaveProperty("updatedAt");
                expect(response.body).toHaveProperty("deletedAt", null);
            }
        );

        it(
            "Should successfully inactivate a document",
            async () => {
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                const documentId = 26;

                const authenticationResponse = await request
                    .post(`${baseURL}/user/authenticate`)
                    .send(authenticationData);

                const { id: userId } = authenticationResponse.body.user;
                const { token } = authenticationResponse.body;
                const response = await request
                    .delete(`${baseURL}/document/inactivate/${documentId}`)
                    .set("Authorization", `Bearer ${token}`);

                const documentInDatabase = await prisma.document.findFirst(
                    {
                        where: {
                            id: documentId
                        }
                    }
                );

                expect(response.status).toBe(204);
                expect(response.body).toStrictEqual({});
                expect(documentInDatabase).toBeDefined();
                expect(documentInDatabase).toHaveProperty("id", documentId);
                expect(documentInDatabase).toHaveProperty("title", "Inactivate Document Test");
                expect(documentInDatabase).toHaveProperty("text", "Lorem Ipsum");
                expect(documentInDatabase).toHaveProperty("userId", userId);
                expect(documentInDatabase).toHaveProperty("folderId", null);
                expect(documentInDatabase).toHaveProperty("isEncrypted", false);
                expect(documentInDatabase).toHaveProperty("createdAt");
                expect(documentInDatabase).toHaveProperty("updatedAt");
                expect(documentInDatabase).toHaveProperty("deletedAt");
                expect(documentInDatabase!.deletedAt).not.toBeNull();
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
            }
        );
    }
);