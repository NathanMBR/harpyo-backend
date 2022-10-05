import { DocumentInterface } from "@/interfaces";

export namespace FindOneDocumentContract {
    export interface Request {
        id: number;
    }

    export type Response = DocumentInterface | null;
}

export interface FindOneDocumentContract {
    findOne: (data: FindOneDocumentContract.Request) => Promise<FindOneDocumentContract.Response>;
}