import {
    Request,
    Response
} from "express";

import { GenericControllerContract } from "../contracts";
import { AuthenticateUserResource } from "@/resources/user";
import {
    PrismaReadOneUserByEmailRepository
} from "@/repositories/user";
import { controllerErrorHandler } from "@/handlers";

export class AuthenticateUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        try {
            const readOneUserByEmailRepository = new PrismaReadOneUserByEmailRepository();
            const authenticateUserResource = new AuthenticateUserResource(
                readOneUserByEmailRepository
            );

            const {
                email,
                password
            } = request.body;

            const authenticationData = await authenticateUserResource.execute(
                {
                    email,
                    password
                }
            );

            return response.status(200).json(authenticationData);
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}