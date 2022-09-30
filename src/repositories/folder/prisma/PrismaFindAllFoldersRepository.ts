import { FindAllFoldersContract } from "@/repositories/folder";
import { prisma } from "@/database/prisma";
import { Prisma } from "@prisma/client";

export class PrismaFindAllFoldersRepository implements FindAllFoldersContract {
    async findAll(data: FindAllFoldersContract.Request) {
        const orderByArray: Prisma.Enumerable<Prisma.FolderOrderByWithRelationInput> = [
            {
                name: "asc"
            }
        ];

        if (data.orderColumn)
            orderByArray.unshift(
                {
                    [data.orderColumn]: data.orderBy
                }
            );

        const folders = await prisma.folder.findMany(
            {
                where: {
                    name: {
                        contains: data.search
                    }
                },

                skip: data.skip,
                take: data.take,
                orderBy: orderByArray
            }
        );

        return folders;
    }
}