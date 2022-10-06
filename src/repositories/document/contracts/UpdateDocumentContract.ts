import { DocumentInterface } from "@/interfaces";

export namespace UpdateDocumentContract {
    export interface Request {
        id: number;
        title: string;
        text: string | null;
        folderId: number | null;
        isEncrypted: boolean;
    }

    export type Response = DocumentInterface;
}

export interface UpdateDocumentContract {
    update: (data: UpdateDocumentContract.Request) => Promise<UpdateDocumentContract.Response>;
}