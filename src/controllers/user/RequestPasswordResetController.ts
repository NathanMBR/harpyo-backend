import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { RequestPasswordResetResource } from "@/resources/user";
import { PrismaReadOneUserByEmailRepository } from "@/repositories/user";
import { PrismaCreatePasswordResetRepository } from "@/repositories/passwordReset";
import { NodeMailerSendPasswordResetRequestEmailService } from "@/services/email";
import { controllerErrorHandler } from "@/handlers";

export class RequestPasswordResetController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readOneUserByEmailRepository = new PrismaReadOneUserByEmailRepository();
            const createPasswordResetRepository = new PrismaCreatePasswordResetRepository();
            const sendPasswordResetRequestEmailService = new NodeMailerSendPasswordResetRequestEmailService();

            const requestPasswordResetResource = new RequestPasswordResetResource(
                readOneUserByEmailRepository,
                createPasswordResetRepository,
                sendPasswordResetRequestEmailService
            );

            const { email } = request.body;
            await requestPasswordResetResource.execute(
                {
                    email
                }
            );

            return response.sendStatus(204);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}