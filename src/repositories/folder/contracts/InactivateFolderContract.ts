export namespace InactivateFolderContract {
    export interface Request {
        id: number;
    }

    export type Response = void;
}

export interface InactivateFolderContract {
    inactivate: (data: InactivateFolderContract.Request) => Promise<InactivateFolderContract.Response>;
}