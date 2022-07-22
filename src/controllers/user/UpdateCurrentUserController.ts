import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { UpdateCurrentUserResource } from "@/resources/user";
import {
    PrismaReadCurrentUserRepository,
    PrismaUpdateCurrentUserRepository
} from "@/repositories/user";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class UpdateCurrentUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();
            const updateCurrentUserRepository = new PrismaUpdateCurrentUserRepository();

            const updateCurrentUserResource = new UpdateCurrentUserResource(
                readCurrentUserRepository,
                updateCurrentUserRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("You must be authenticated to access this page");

            const id = authenticationData.sub;
            const { name } = request.body;

            const user = await updateCurrentUserResource.execute(
                {
                    id,
                    name
                }
            );

            return response.json(user);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}