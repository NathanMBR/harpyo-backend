import { InactivateFolderContract } from "@/repositories/folder";
import { prisma } from "@/database/prisma";

export class PrismaInactivateFolderRepository implements InactivateFolderContract {
    async inactivate(data: InactivateFolderContract.Request) {
        await prisma.folder.update(
            {
                where: {
                    id: data.id
                },

                data: {
                    deletedAt: new Date()
                }
            }
        );

        return;
    }
}