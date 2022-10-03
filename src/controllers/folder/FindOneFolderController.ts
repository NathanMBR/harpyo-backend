import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { FindOneFolderResource } from "@/resources/folder";
import { PrismaFindOneFolderRepository } from "@/repositories/folder";
import {
    BadRequestError,
    InternalServerError
} from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class FindOneFolderController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneFolderRepository = new PrismaFindOneFolderRepository();

            const findOneFolderResource = new FindOneFolderResource(
                findOneFolderRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const id = Number(request.params.id);
            const userId = authenticationData.sub;

            if (Number.isNaN(id))
                throw new BadRequestError("The folder ID must be a number");

            const folder = await findOneFolderResource.execute(
                {
                    id,
                    userId
                }
            );

            return response.status(200).json(folder);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}