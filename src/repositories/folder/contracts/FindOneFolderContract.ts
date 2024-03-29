import { FolderInterface } from "@/interfaces";

export namespace FindOneFolderContract {
    export interface Request {
        id: number;
    }

    export type Response = FolderInterface | null;
}

export interface FindOneFolderContract {
    findOne: (data: FindOneFolderContract.Request) => Promise<FindOneFolderContract.Response>;
}