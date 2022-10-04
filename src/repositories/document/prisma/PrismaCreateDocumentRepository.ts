import { CreateDocumentContract } from "@/repositories/document";
import { prisma } from "@/database/prisma";

export class PrismaCreateDocumentRepository implements CreateDocumentContract {
    async create(data: CreateDocumentContract.Request) {
        const document = await prisma.document.create(
            {
                data: {
                    title: data.title,
                    text: data.text,
                    folderId: data.folderId,
                    userId: data.userId,
                    isEncrypted: data.isEncrypted
                }
            }
        );

        return document;
    }
}