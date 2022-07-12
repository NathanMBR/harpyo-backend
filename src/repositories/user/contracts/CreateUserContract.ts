export namespace CreateUserContract {
    export interface Request {
        name: string;
        email: string;
        password: string;
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

export interface CreateUserContract {
    create: (data: CreateUserContract.Request) => Promise<CreateUserContract.Response>;
}