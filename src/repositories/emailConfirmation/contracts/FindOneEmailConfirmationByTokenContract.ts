import { EmailConfirmationInterface } from "@/interfaces";

export namespace FindOneEmailConfirmationByTokenContract {
    export interface Request {
        token: string;
    }

    export type Response = EmailConfirmationInterface | null;
}

export interface FindOneEmailConfirmationByTokenContract {
    findOneByToken: (data: FindOneEmailConfirmationByTokenContract.Request) => Promise<FindOneEmailConfirmationByTokenContract.Response>;
}