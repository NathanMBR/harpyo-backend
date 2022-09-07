import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { ConfirmUserResource } from "@/resources/user";
import {
    PrismaFindOneEmailConfirmationByTokenRepository,
    PrismaConfirmEmailConfirmationRepository
} from "@/repositories/emailConfirmation";
import {
    PrismaReadCurrentUserRepository,
    PrismaConfirmUserRepository
} from "@/repositories/user";
import { controllerErrorHandler } from "@/handlers";

export class ConfirmUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const findOneEmailConfirmationByTokenRepository = new PrismaFindOneEmailConfirmationByTokenRepository();
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();
            const confirmUserRepository = new PrismaConfirmUserRepository();
            const confirmEmailConfirmationRepository = new PrismaConfirmEmailConfirmationRepository();

            const confirmUserResource = new ConfirmUserResource(
                findOneEmailConfirmationByTokenRepository,
                readCurrentUserRepository,
                confirmUserRepository,
                confirmEmailConfirmationRepository
            );

            const { token } = request.params;

            const user = await confirmUserResource.execute(
                {
                    token
                }
            );

            return response.status(200).json(user);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}