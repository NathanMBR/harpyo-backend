export namespace InactivateCurrentUserContract {
    export interface Request {
        id: number;
    }

    export type Response = void;
}

export interface InactivateCurrentUserContract {
    inactivateCurrent: (data: InactivateCurrentUserContract.Request) => Promise<InactivateCurrentUserContract.Response>;
}