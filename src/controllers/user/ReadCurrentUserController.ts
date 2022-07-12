import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { ReadCurrentUserResource } from "@/resources/user";
import {
    PrismaReadCurrentUserRepository
} from "@/repositories/user";
import { controllerErrorHandler } from "@/handlers";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

export class ReadCurrentUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();

            const readCurrentUserResource = new ReadCurrentUserResource(
                readCurrentUserRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new UnauthorizedError("You must be authenticated to access this page");

            const user = await readCurrentUserResource.execute(
                {
                    id: authenticationData.sub
                }
            );

            return response.json(user);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}