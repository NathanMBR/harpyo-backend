import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { CreateUserResource } from "@/resources/user";
import {
    PrismaReadOneUserByEmailRepository,
    PrismaCreateUserRepository
} from "@/repositories/user";
import { NodeMailerSendWelcomeEmailService } from "@/services/email";
import { controllerErrorHandler } from "@/handlers";

export class CreateUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readOneUserByEmailRepository = new PrismaReadOneUserByEmailRepository();
            const createUserRepository = new PrismaCreateUserRepository();
            const sendWelcomeEmailService = new NodeMailerSendWelcomeEmailService();

            const createUserResource = new CreateUserResource(
                readOneUserByEmailRepository,
                createUserRepository,
                sendWelcomeEmailService
            );

            const {
                name,
                email,
                password
            } = request.body;

            const user = await createUserResource.execute(
                {
                    name,
                    email,
                    password
                }
            );

            return response.status(201).json(user);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}