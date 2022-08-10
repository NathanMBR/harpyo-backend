import { UserInterface } from "@/interfaces";

export namespace ConfirmUserContract {
    export interface Request {
        id: UserInterface["id"];
    }

    export type Response = UserInterface;
}

export interface ConfirmUserContract {
    confirm: (data: ConfirmUserContract.Request) => Promise<ConfirmUserContract.Response>;
}