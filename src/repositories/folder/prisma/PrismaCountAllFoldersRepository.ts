import { CountAllFoldersContract } from "@/repositories/folder";
import { prisma } from "@/database/prisma";

export class PrismaCountAllFoldersRepository implements CountAllFoldersContract {
    async countAll(data: CountAllFoldersContract.Request) {
        const foldersCount = await prisma.folder.count(
            {
                where: {
                    user: {
                        id: data.userId,
                        deletedAt: null
                    },

                    name: {
                        contains: data.search
                    },

                    deletedAt: null
                }
            }
        );

        return foldersCount;
    }
}