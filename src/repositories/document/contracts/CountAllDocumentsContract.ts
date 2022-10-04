export namespace CountAllDocumentsContract {
    export interface Request {
        userId: number;
        folderId?: number | null;
        search: string;
    }

    export type Response = number;
}

export interface CountAllDocumentsContract {
    countAll: (data: CountAllDocumentsContract.Request) => Promise<CountAllDocumentsContract.Response>;
}