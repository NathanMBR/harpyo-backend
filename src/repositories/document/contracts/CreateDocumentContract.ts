import { DocumentInterface } from "@/interfaces";

export namespace CreateDocumentContract {
    export interface Request {
        title: string;
        text: string | null;
        folderId: number | null;
        userId: number;
        isEncrypted: boolean;
    }

    export type Response = DocumentInterface;
}

export interface CreateDocumentContract {
    create: (data: CreateDocumentContract.Request) => Promise<CreateDocumentContract.Response>;
}