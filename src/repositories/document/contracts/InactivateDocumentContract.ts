export namespace InactivateDocumentContract {
    export interface Request {
        id: number;
    }

    export type Response = void;
}

export interface InactivateDocumentContract {
    inactivate: (data: InactivateDocumentContract.Request) => Promise<InactivateDocumentContract.Response>;
}