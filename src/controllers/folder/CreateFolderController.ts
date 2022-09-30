import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { CreateFolderResource } from "@/resources/folder";
import { PrismaCreateFolderRepository } from "@/repositories/folder";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class CreateFolderController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const createFolderRepository = new PrismaCreateFolderRepository();

            const createFolderResource = new CreateFolderResource(
                createFolderRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const { sub: userId } = authenticationData;
            const { name } = request.body;

            const folder = await createFolderResource.execute(
                {
                    name,
                    userId
                }
            );

            return response.status(201).json(folder);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}