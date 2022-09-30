import { FolderInterface } from "@/interfaces";

export namespace FindAllFoldersContract {
    export interface Request {
        skip: number;
        take: number;
        orderColumn?: "id" | "updatedAt";
        orderBy: "asc" | "desc";
        search: string;
    }

    export type Response = Array<FolderInterface>;
}

export interface FindAllFoldersContract {
    findAll: (data: FindAllFoldersContract.Request) => Promise<FindAllFoldersContract.Response>;
}