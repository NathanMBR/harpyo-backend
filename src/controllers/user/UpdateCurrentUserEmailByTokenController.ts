import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { UpdateUserEmailByTokenResource } from "@/resources/user";
import {
    PrismaFindOneEmailConfirmationByTokenRepository,
    PrismaConfirmEmailConfirmationRepository
} from "@/repositories/emailConfirmation";
import { PrismaUpdateCurrentUserEmailRepository } from "@/repositories/user";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class UpdateCurrentUserEmailByTokenController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneEmailConfirmationByTokenRepository = new PrismaFindOneEmailConfirmationByTokenRepository();
            const confirmEmailConfirmationRepository = new PrismaConfirmEmailConfirmationRepository();
            const updateCurrentUserEmailRepository = new PrismaUpdateCurrentUserEmailRepository();

            const updateUserEmailByTokenResource = new UpdateUserEmailByTokenResource(
                findOneEmailConfirmationByTokenRepository,
                confirmEmailConfirmationRepository,
                updateCurrentUserEmailRepository
            );

            const authenticationData = request.user;
            if (!authenticationData)
                throw new InternalServerError("User must be authenticated");

            const { sub: userId } = authenticationData;
            const { token } = request.params;
            const { email } = request.body;

            await updateUserEmailByTokenResource.execute(
                {
                    userId,
                    token,
                    email
                }
            );

            return response.sendStatus(204);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}