import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { FindAllDocumentsResource } from "@/resources/document";
import {
    PrismaFindAllDocumentsRepository,
    PrismaCountAllDocumentsRepository
} from "@/repositories/document";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class FindAllDocumentsController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findAllDocumentsRepository = new PrismaFindAllDocumentsRepository();
            const countAllDocumentsRepository = new PrismaCountAllDocumentsRepository();

            const findAllDocumentsResource = new FindAllDocumentsResource(
                findAllDocumentsRepository,
                countAllDocumentsRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const userId = authenticationData.sub;
            const page = Number(request.query.page) || undefined;
            const quantity = Number(request.query.quantity) || undefined;

            const orderColumn = request.query.orderColumn
                ? String(request.query.orderColumn) as "id" | "updatedAt"
                : undefined;

            const orderBy = request.query.orderBy
                ? String(request.query.orderBy) as "asc" | "desc"
                : "asc";

            const search = request.query.search
                ? String(request.query.search)
                : "";

            const folderId = request.query.folderId ?
                String(request.query.folderId) === "null"
                    ? null
                    : Number(request.query.folderId)
                : undefined;

            const documents = await findAllDocumentsResource.execute(
                {
                    userId,
                    folderId,
                    page,
                    quantity,
                    orderColumn,
                    orderBy,
                    search
                }
            );

            return response.status(200).json(documents);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}