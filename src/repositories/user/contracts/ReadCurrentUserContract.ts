import { UserInterface } from "@/interfaces";

export namespace ReadCurrentUserContract {
    export interface Request {
        id: number;
    }

    export type Response = UserInterface;
}

export interface ReadCurrentUserContract {
    readCurrent: (data: ReadCurrentUserContract.Request) => Promise<ReadCurrentUserContract.Response | null>;
}