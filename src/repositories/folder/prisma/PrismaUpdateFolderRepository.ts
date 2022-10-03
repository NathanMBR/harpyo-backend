import { UpdateFolderContract } from "@/repositories/folder";
import { prisma } from "@/database/prisma";

export class PrismaUpdateFolderRepository implements UpdateFolderContract {
    async update(data: UpdateFolderContract.Request) {
        const folder = await prisma.folder.update(
            {
                where: {
                    id: data.id
                },

                data: {
                    name: data.name
                }
            }
        );

        return folder;
    }
}