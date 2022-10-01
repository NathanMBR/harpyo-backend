export namespace CountAllFoldersContract {
    export interface Request {
        userId: number;
        search: string;
    }

    export type Response = number;
}

export interface CountAllFoldersContract {
    countAll: (data: CountAllFoldersContract.Request) => Promise<CountAllFoldersContract.Response>;
}