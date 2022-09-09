import { PasswordResetInterface } from "@/interfaces";

export namespace CreatePasswordResetContract {
    export interface Request {
        userId: number;
        resetedAt: Date | null;
        method: "RESET" | "CHANGE";
    }

    export type Response = PasswordResetInterface;
}

export interface CreatePasswordResetContract {
    create: (data: CreatePasswordResetContract.Request) => Promise<CreatePasswordResetContract.Response>;
}