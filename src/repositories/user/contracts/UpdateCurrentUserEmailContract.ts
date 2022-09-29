import { UserInterface } from "@/interfaces";

export namespace UpdateCurrentUserEmailContract {
    export interface Request {
        id: number;
        email: string;
    }

    export type Response = UserInterface;
}

export interface UpdateCurrentUserEmailContract {
    updateCurrentEmail: (data: UpdateCurrentUserEmailContract.Request) => Promise<UpdateCurrentUserEmailContract.Response>;
}