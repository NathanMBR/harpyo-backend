import { UserInterface } from "@/interfaces";

export namespace UpdateCurrentUserPasswordContract {
    export interface Request {
        id: number;
        password: string;
    }

    export type Response = UserInterface;
}

export interface UpdateCurrentUserPasswordContract {
    updateCurrentPassword: (data: UpdateCurrentUserPasswordContract.Request) => Promise<UpdateCurrentUserPasswordContract.Response>;
}