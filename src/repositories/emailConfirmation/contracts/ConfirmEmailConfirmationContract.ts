import { EmailConfirmationInterface } from "@/interfaces";

export namespace ConfirmEmailConfirmationContract {
    export interface Request {
        id: EmailConfirmationInterface["id"];
    }

    export type Response = EmailConfirmationInterface;
}

export interface ConfirmEmailConfirmationContract {
    confirm: (data: ConfirmEmailConfirmationContract.Request) => Promise<ConfirmEmailConfirmationContract.Response>;
}