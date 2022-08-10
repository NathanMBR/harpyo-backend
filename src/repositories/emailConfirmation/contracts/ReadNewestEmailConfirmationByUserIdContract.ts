import { EmailConfirmationInterface } from "@/interfaces";

export namespace ReadNewestEmailConfirmationByUserIdContract {
    export interface Request {
        userId: number;
    }

    export type Response = EmailConfirmationInterface;
}

export interface ReadNewestEmailConfirmationByUserIdContract {
    readNewestByUserId: (data: ReadNewestEmailConfirmationByUserIdContract.Request) => Promise<ReadNewestEmailConfirmationByUserIdContract.Response | null>;
}