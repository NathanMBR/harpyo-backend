interface EmailConfirmation {
    id: number;
    userId: number;
    email: string;
    token: string;
    lastRequestedAt: Date;
    confirmedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

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

        emailConfirmation: EmailConfirmation;
    }
}

export interface CreateUserContract {
    create: (data: CreateUserContract.Request) => Promise<CreateUserContract.Response>;
}