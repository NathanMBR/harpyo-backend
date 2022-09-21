import { PasswordResetInterface } from "@/interfaces";

export namespace UpdatePasswordResetContract {
    export interface Request {
        id: PasswordResetInterface["id"];
        resetedAt: PasswordResetInterface["resetedAt"];
        method: PasswordResetInterface["method"];
    }

    export type Response = PasswordResetInterface;
}

export interface UpdatePasswordResetContract {
    update: (data: UpdatePasswordResetContract.Request) => Promise<UpdatePasswordResetContract.Response>;
}