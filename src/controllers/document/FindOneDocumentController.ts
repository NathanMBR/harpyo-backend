import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { FindOneDocumentResource } from "@/resources/document";
import { PrismaFindOneDocumentRepository } from "@/repositories/document";
import {
    BadRequestError,
    InternalServerError
} from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class FindOneDocumentController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneDocumentRepository = new PrismaFindOneDocumentRepository();

            const findOneDocumentResource = new FindOneDocumentResource(
                findOneDocumentRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const id = Number(request.params.id);
            const userId = authenticationData.sub;

            if (Number.isNaN(id))
                throw new BadRequestError("The document ID must be a number");

            const document = await findOneDocumentResource.execute(
                {
                    id,
                    userId
                }
            );

            return response.status(200).json(document);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}