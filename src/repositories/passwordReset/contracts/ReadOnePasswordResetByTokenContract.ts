import { PasswordResetInterface } from "@/interfaces";

export namespace ReadOnePasswordResetByTokenContract {
    export interface Request {
        token: string;
    }

    export type Response = PasswordResetInterface;
}

export interface ReadOnePasswordResetByTokenContract {
    findOneByToken: (data: ReadOnePasswordResetByTokenContract.Request) => Promise<ReadOnePasswordResetByTokenContract.Response | null>;
}