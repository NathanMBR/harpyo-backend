import { EmailConfirmationInterface } from "@/interfaces";

export namespace CreateEmailConfirmationContract {
    export interface Request {
        userId: EmailConfirmationInterface["userId"];
        email: EmailConfirmationInterface["email"];
    }

    export type Response = EmailConfirmationInterface;
}

export interface CreateEmailConfirmationContract {
    create: (data: CreateEmailConfirmationContract.Request) => Promise<CreateEmailConfirmationContract.Response>;
}