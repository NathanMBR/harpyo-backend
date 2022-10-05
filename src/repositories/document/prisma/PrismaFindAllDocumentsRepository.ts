import { FindAllDocumentsContract } from "@/repositories/document";
import { prisma } from "@/database/prisma";
import { Prisma } from "@prisma/client";

export class PrismaFindAllDocumentsRepository implements FindAllDocumentsContract {
    async findAll(data: FindAllDocumentsContract.Request) {
        const orderByArray: Prisma.Enumerable<Prisma.DocumentOrderByWithRelationInput> = [
            {
                title: "asc"
            }
        ];

        if (data.orderColumn)
            orderByArray.unshift(
                {
                    [data.orderColumn]: data.orderBy
                }
            );

        const documents = await prisma.document.findMany(
            {
                where: {
                    user: {
                        id: data.userId,
                        deletedAt: null
                    },

                    OR: [
                        {
                            title: {
                                contains: data.search
                            }
                        },

                        {
                            text: {
                                contains: data.search
                            }
                        }
                    ],

                    folderId: data.folderId,
                    deletedAt: null
                },

                skip: data.skip,
                take: data.take,
                orderBy: orderByArray
            }
        );

        return documents;
    }
}