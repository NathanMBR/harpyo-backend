import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { CreateDocumentResource } from "@/resources/document";
import { PrismaCreateDocumentRepository } from "@/repositories/document";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class CreateDocumentController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const createDocumentRepository = new PrismaCreateDocumentRepository();

            const createDocumentResource = new CreateDocumentResource(
                createDocumentRepository
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

            const document = await createDocumentResource.execute(
                {
                    title,
                    text,
                    folderId,
                    userId,
                    isEncrypted
                }
            );

            return response.status(201).json(document);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}