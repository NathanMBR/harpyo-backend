import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { UpdateFolderResource } from "@/resources/folder";
import {
    PrismaFindOneFolderRepository,
    PrismaUpdateFolderRepository
} from "@/repositories/folder";
import {
    BadRequestError,
    InternalServerError
} from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class UpdateFolderController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneFolderRepository = new PrismaFindOneFolderRepository();
            const updateFolderRepository = new PrismaUpdateFolderRepository();

            const updateFolderResource = new UpdateFolderResource(
                findOneFolderRepository,
                updateFolderRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const { sub: userId } = authenticationData;
            const { name } = request.body;
            const id = Number(request.params.id);
            if (Number.isNaN(id))
                throw new BadRequestError("The folder ID must be a valid number");

            const folder = await updateFolderResource.execute(
                {
                    id,
                    name,
                    userId
                }
            );

            return response.status(200).json(folder);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}