export namespace ReadNewestEmailConfirmationByUserIdContract {
    export interface Request {
        userId: number;
    }

    export interface Response {
        id: number;
        userId: number;
        email: string;
        token: string;
        confirmedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }
}

export interface ReadNewestEmailConfirmationByUserIdContract {
    readNewestByUserId: (data: ReadNewestEmailConfirmationByUserIdContract.Request) => Promise<ReadNewestEmailConfirmationByUserIdContract.Response | null>;
}