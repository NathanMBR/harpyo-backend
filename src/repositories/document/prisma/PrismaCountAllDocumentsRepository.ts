import { CountAllDocumentsContract } from "@/repositories/document";
import { prisma } from "@/database/prisma";

export class PrismaCountAllDocumentsRepository implements CountAllDocumentsContract {
    async countAll(data: CountAllDocumentsContract.Request) {
        const documentsCount = await prisma.document.count(
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
                }
            }
        );

        return documentsCount;
    }
}