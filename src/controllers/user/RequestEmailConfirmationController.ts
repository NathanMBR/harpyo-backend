import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { RequestEmailConfirmationResource } from "@/resources/user";
import {
    PrismaReadCurrentUserRepository,
    PrismaReadOneUserByEmailRepository
} from "@/repositories/user";
import { PrismaCreateEmailConfirmationRepository } from "@/repositories/emailConfirmation";
import { NodeMailerSendEmailConfirmationEmailService } from "@/services/email";
import { InternalServerError } from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class RequestEmailConfirmationController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readCurrentUserRepository = new PrismaReadCurrentUserRepository();
            const readOneUserByEmailRepository = new PrismaReadOneUserByEmailRepository();
            const createEmailConfirmationRepository = new PrismaCreateEmailConfirmationRepository();
            const sendEmailConfirmationEmailService = new NodeMailerSendEmailConfirmationEmailService();

            const requestEmailConfirmationResource = new RequestEmailConfirmationResource(
                readCurrentUserRepository,
                readOneUserByEmailRepository,
                createEmailConfirmationRepository,
                sendEmailConfirmationEmailService
            );

            const userData = request.user;
            if (!userData)
                throw new InternalServerError("User data not found");

            const userId = userData.sub;

            const { email } = request.body;
            await requestEmailConfirmationResource.execute(
                {
                    userId,
                    email
                }
            );

            return response.sendStatus(204);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}