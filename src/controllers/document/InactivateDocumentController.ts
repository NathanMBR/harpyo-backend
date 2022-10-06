import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { InactivateDocumentResource } from "@/resources/document";
import {
    PrismaFindOneDocumentRepository,
    PrismaInactivateDocumentRepository
} from "@/repositories/document";
import {
    BadRequestError,
    InternalServerError
} from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class InactivateDocumentController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneFolderRepository = new PrismaFindOneDocumentRepository();
            const inactivateFolderRepository = new PrismaInactivateDocumentRepository();

            const inactivateFolderResource = new InactivateDocumentResource(
                findOneFolderRepository,
                inactivateFolderRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const userId = authenticationData.sub;
            const id = Number(request.params.id);
            if (Number.isNaN(id))
                throw new BadRequestError("The document ID must be a valid number");

            await inactivateFolderResource.execute(
                {
                    id,
                    userId
                }
            );

            return response.sendStatus(204);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}