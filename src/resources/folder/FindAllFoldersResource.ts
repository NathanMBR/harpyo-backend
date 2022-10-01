import { z as zod } from "zod";

import { findAllFoldersDTOSchema } from "./schemas";
import {
    FindAllFoldersContract,
    CountAllFoldersContract
} from "@/repositories/folder";
import {
    getPaginationParametersHelper,
    getPaginationDataHelper
} from "@/helpers";

type FindAllFoldersDTO = zod.infer<typeof findAllFoldersDTOSchema>;

export class FindAllFoldersResource {
    constructor(
        private readonly findAllFoldersRepository: FindAllFoldersContract,
        private readonly countAllFoldersRepository: CountAllFoldersContract
    ) { }

    async execute(dto: FindAllFoldersDTO) {
        const folderData = findAllFoldersDTOSchema.parse(dto);
        const {
            userId,
            page,
            quantity,
            orderColumn,
            orderBy,
            search
        } = folderData;

        const {
            skip,
            take
        } = getPaginationParametersHelper(page, quantity);

        const folders = await this.findAllFoldersRepository.findAll(
            {
                userId,
                skip,
                take,
                orderColumn: orderColumn as FindAllFoldersContract.Request["orderColumn"],
                orderBy: orderBy as FindAllFoldersContract.Request["orderBy"],
                search
            }
        );

        const foldersCount = await this.countAllFoldersRepository.countAll(
            {
                userId,
                search
            }
        );

        const paginatedFolders = getPaginationDataHelper(
            {
                count: foldersCount,
                skip,
                take,
                data: folders
            }
        );

        return paginatedFolders;
    }
}