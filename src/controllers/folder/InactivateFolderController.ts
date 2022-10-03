import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { InactivateFolderResource } from "@/resources/folder";
import {
    PrismaFindOneFolderRepository,
    PrismaInactivateFolderRepository
} from "@/repositories/folder";
import {
    BadRequestError,
    InternalServerError
} from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class InactivateFolderController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneFolderRepository = new PrismaFindOneFolderRepository();
            const inactivateFolderRepository = new PrismaInactivateFolderRepository();

            const inactivateFolderResource = new InactivateFolderResource(
                findOneFolderRepository,
                inactivateFolderRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const userId = authenticationData.sub;
            const id = Number(request.params.id);
            if (Number.isNaN(id))
                throw new BadRequestError("The folder ID must be a valid number");

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