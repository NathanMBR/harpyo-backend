import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { InactivateCurrentUserResource } from "@/resources/user";
import {
    PrismaReadCurrentUserRepository,
    PrismaInactivateCurrentUserRepository
} from "@/repositories/user";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class InactivateCurrentUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();
            const inactivateCurrentUserRepository = new PrismaInactivateCurrentUserRepository();

            const inactivateCurrentUserResource = new InactivateCurrentUserResource(
                readCurrentUserRepository,
                inactivateCurrentUserRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("You must be authenticated to access this page");

            const id = authenticationData.sub;

            await inactivateCurrentUserResource.execute(
                {
                    id
                }
            );

            return response.sendStatus(204);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}