import { FolderInterface } from "@/interfaces";

export namespace UpdateFolderContract {
    export interface Request {
        id: number;
        name: string;
    }

    export type Response = FolderInterface;
}

export interface UpdateFolderContract {
    update: (data: UpdateFolderContract.Request) => Promise<UpdateFolderContract.Response>;
}