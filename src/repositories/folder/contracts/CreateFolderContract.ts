import { FolderInterface } from "@/interfaces";

export namespace CreateFolderContract {
    export interface Request {
        name: string;
        userId: number;
    }

    export type Response = FolderInterface;
}

export interface CreateFolderContract {
    create: (data: CreateFolderContract.Request) => Promise<CreateFolderContract.Response>;
}