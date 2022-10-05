import { DocumentInterface } from "@/interfaces";

export namespace FindAllDocumentsContract {
    export interface Request {
        userId: number;
        folderId?: number | null;
        skip: number;
        take: number;
        orderColumn?: "id" | "updatedAt";
        orderBy: "asc" | "desc";
        search: string;
    }

    export type Response = Array<DocumentInterface>;
}

export interface FindAllDocumentsContract {
    findAll: (data: FindAllDocumentsContract.Request) => Promise<FindAllDocumentsContract.Response>;
}