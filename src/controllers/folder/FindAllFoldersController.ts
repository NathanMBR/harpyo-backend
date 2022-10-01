import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { FindAllFoldersResource } from "@/resources/folder";
import {
    PrismaFindAllFoldersRepository,
    PrismaCountAllFoldersRepository
} from "@/repositories/folder";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class FindAllFoldersController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findAllFoldersRepository = new PrismaFindAllFoldersRepository();
            const countAllFoldersRepository = new PrismaCountAllFoldersRepository();

            const findAllFoldersResource = new FindAllFoldersResource(
                findAllFoldersRepository,
                countAllFoldersRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const userId = authenticationData.sub;
            const page = Number(request.query.page) || undefined;
            const quantity = Number(request.query.quantity) || undefined;

            const orderColumn = request.query.orderColumn
                ? String(request.query.orderColumn)
                : undefined;

            const orderBy = request.query.orderBy
                ? String(request.query.orderBy)
                : "asc";

            const search = request.query.search
                ? String(request.query.search)
                : "";

            const folders = await findAllFoldersResource.execute(
                {
                    userId,
                    page,
                    quantity,
                    orderColumn,
                    orderBy,
                    search
                }
            );

            return response.status(200).json(folders);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}