export namespace ReadOneUserByEmailContract {
    export interface Request {
        email: string;
    }

    export interface Response {
        id: number;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }
}

export interface ReadOneUserByEmailContract {
    readOneByEmail: (data: ReadOneUserByEmailContract.Request) => Promise<ReadOneUserByEmailContract.Response | null>;
}