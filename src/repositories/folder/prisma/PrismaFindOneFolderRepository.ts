import { FindOneFolderContract } from "@/repositories/folder";
import { prisma } from "@/database/prisma";

export class PrismaFindOneFolderRepository {
    async findOne(data: FindOneFolderContract.Request) {
        const folder = await prisma.folder.findFirst(
            {
                where: {
                    id: data.id,
                    deletedAt: null
                }
            }
        );

        return folder;
    }
}