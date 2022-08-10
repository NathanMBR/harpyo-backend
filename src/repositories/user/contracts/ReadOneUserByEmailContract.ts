import { UserInterface } from "@/interfaces";

export namespace ReadOneUserByEmailContract {
    export interface Request {
        email: string;
    }

    export type Response = UserInterface;
}

export interface ReadOneUserByEmailContract {
    readOneByEmail: (data: ReadOneUserByEmailContract.Request) => Promise<ReadOneUserByEmailContract.Response | null>;
}