import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { UpdateDocumentResource } from "@/resources/document";
import {
    PrismaFindOneDocumentRepository,
    PrismaUpdateDocumentRepository
} from "@/repositories/document";
import {
    BadRequestError,
    InternalServerError
} from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class UpdateDocumentController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneDocumentRepository = new PrismaFindOneDocumentRepository();
            const updateDocumentRepository = new PrismaUpdateDocumentRepository();

            const updateDocumentResource = new UpdateDocumentResource(
                findOneDocumentRepository,
                updateDocumentRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const { sub: userId } = authenticationData;
            const {
                title,
                text,
                folderId,
                isEncrypted
            } = request.body;

            const id = Number(request.params.id);
            if (Number.isNaN(id))
                throw new BadRequestError("The document ID must be a valid number");

            const document = await updateDocumentResource.execute(
                {
                    id,
                    title,
                    text,
                    userId,
                    folderId,
                    isEncrypted
                }
            );

            return response.status(200).json(document);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}