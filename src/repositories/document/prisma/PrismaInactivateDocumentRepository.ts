import { InactivateDocumentContract } from "@/repositories/document";
import { prisma } from "@/database/prisma";

export class PrismaInactivateDocumentRepository implements InactivateDocumentContract {
    async inactivate(data: InactivateDocumentContract.Request) {
        await prisma.document.update(
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