export namespace UpdateCurrentUserContract {
    export interface Request {
        id: number;
        name: string;
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

export interface UpdateCurrentUserContract {
    updateCurrent: (data: UpdateCurrentUserContract.Request) => Promise<UpdateCurrentUserContract.Response>;
}