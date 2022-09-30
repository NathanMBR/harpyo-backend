import { CreateFolderContract } from "@/repositories/folder";
import { prisma } from "@/database/prisma";

export class PrismaCreateFolderRepository implements CreateFolderContract {
    async create(data: CreateFolderContract.Request) {
        const folder = await prisma.folder.create(
            {
                data: {
                    name: data.name,
                    userId: data.userId
                }
            }
        );

        return folder;
    }
}