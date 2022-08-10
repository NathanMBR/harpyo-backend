import {
    UserInterface,
    EmailConfirmationInterface
} from "@/interfaces";

export namespace CreateUserContract {
    export interface Request {
        name: string;
        email: string;
        password: string;
    }

    export type Response = UserInterface & {
        emailConfirmation: EmailConfirmationInterface;
    }
}

export interface CreateUserContract {
    create: (data: CreateUserContract.Request) => Promise<CreateUserContract.Response>;
}