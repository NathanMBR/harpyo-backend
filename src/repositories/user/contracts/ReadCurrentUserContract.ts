import { UserInterface } from "@/interfaces";

export namespace ReadCurrentUserContract {
    export interface Request {
        id: number;
    }

    export type Response = UserInterface | null;
}

export interface ReadCurrentUserContract {
    readCurrent: (data: ReadCurrentUserContract.Request) => Promise<ReadCurrentUserContract.Response>;
}