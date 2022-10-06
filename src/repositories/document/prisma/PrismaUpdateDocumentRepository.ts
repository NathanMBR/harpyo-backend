import { UpdateDocumentContract } from "@/repositories/document";
import { prisma } from "@/database/prisma";

export class PrismaUpdateDocumentRepository implements UpdateDocumentContract {
    async update(data: UpdateDocumentContract.Request) {
        const document = await prisma.document.update(
            {
                where: {
                    id: data.id
                },

                data: {
                    title: data.title,
                    text: data.text,
                    folderId: data.folderId,
                    isEncrypted: data.isEncrypted
                }
            }
        );

        return document;
    }
}