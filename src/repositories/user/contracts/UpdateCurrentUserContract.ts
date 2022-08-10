import { UserInterface } from "@/interfaces";

export namespace UpdateCurrentUserContract {
    export interface Request {
        id: number;
        name: string;
    }

    export type Response = UserInterface;
}

export interface UpdateCurrentUserContract {
    updateCurrent: (data: UpdateCurrentUserContract.Request) => Promise<UpdateCurrentUserContract.Response>;
}