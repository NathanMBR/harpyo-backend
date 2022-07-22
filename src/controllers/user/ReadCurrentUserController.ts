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
import { InternalServerError } from "@/errors";

export class ReadCurrentUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();

            const readCurrentUserResource = new ReadCurrentUserResource(
                readCurrentUserRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("You must be authenticated to access this page");

            const id = authenticationData.sub;
            const user = await readCurrentUserResource.execute(
                {
                    id
                }
            );

            return response.json(user);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}