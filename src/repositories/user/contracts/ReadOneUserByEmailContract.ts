import { UserInterface } from "@/interfaces";

export namespace ReadOneUserByEmailContract {
    export interface Request {
        email: string;
    }

    export type Response = UserInterface | null;
}

export interface ReadOneUserByEmailContract {
    readOneByEmail: (data: ReadOneUserByEmailContract.Request) => Promise<ReadOneUserByEmailContract.Response>;
}