export namespace ReadCurrentUserContract {
    export interface Request {
        id: number;
    }

    export interface Response {
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }
}

export interface ReadCurrentUserContract {
    readCurrent: (data: ReadCurrentUserContract.Request) => Promise<ReadCurrentUserContract.Response | null>;
}