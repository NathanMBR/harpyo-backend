import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { UpdateUserPasswordByTokenResource } from "@/resources/user";
import {
    PrismaReadOnePasswordResetByTokenRepository,
    PrismaUpdatePasswordResetRepository
} from "@/repositories/passwordReset";
import {
    PrismaReadCurrentUserRepository,
    PrismaUpdateCurrentUserPasswordRepository
} from "@/repositories/user";
import { controllerErrorHandler } from "@/handlers";

export class UpdateUserPasswordByTokenController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readOnePasswordResetByTokenRepository = new PrismaReadOnePasswordResetByTokenRepository();
            const updatePasswordResetRepository = new PrismaUpdatePasswordResetRepository();
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();
            const updateCurrentUserPasswordRepository = new PrismaUpdateCurrentUserPasswordRepository();

            const updateUserPasswordByTokenResource = new UpdateUserPasswordByTokenResource(
                readOnePasswordResetByTokenRepository,
                updatePasswordResetRepository,
                readCurrentUserRepository,
                updateCurrentUserPasswordRepository
            );

            const { token } = request.params;
            const { password } = request.body;

            await updateUserPasswordByTokenResource.execute(
                {
                    token,
                    password
                }
            );

            return response.sendStatus(204);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}