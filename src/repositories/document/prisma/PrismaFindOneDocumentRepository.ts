import { FindOneDocumentContract } from "@/repositories/document";
import { prisma } from "@/database/prisma";

export class PrismaFindOneDocumentRepository implements FindOneDocumentContract {
    async findOne(data: FindOneDocumentContract.Request) {
        const document = await prisma.document.findFirst(
            {
                where: {
                    id: data.id,
                    deletedAt: null
                }
            }
        );

        return document;
    }
}