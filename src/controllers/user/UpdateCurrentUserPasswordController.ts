import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { UpdateCurrentUserPasswordResource } from "@/resources/user";
import {
    PrismaReadCurrentUserRepository,
    PrismaUpdateCurrentUserPasswordRepository
} from "@/repositories/user";
import { PrismaCreatePasswordResetRepository } from "@/repositories/passwordReset";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class UpdateCurrentUserPasswordController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();
            const updateCurrentUserPasswordRepository = new PrismaUpdateCurrentUserPasswordRepository();
            const createPasswordResetRepository = new PrismaCreatePasswordResetRepository();

            const updateCurrentUserPasswordResource = new UpdateCurrentUserPasswordResource(
                readCurrentUserRepository,
                updateCurrentUserPasswordRepository,
                createPasswordResetRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const id = authenticationData.sub;
            const { currentPassword, newPassword } = request.body;
            const user = await updateCurrentUserPasswordResource.execute(
                {
                    id,
                    currentPassword,
                    newPassword
                }
            );

            return response.json(user);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}