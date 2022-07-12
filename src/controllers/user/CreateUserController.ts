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

export class CreateUserController implements GenericControllerContract {
    async handle(request: Request, response: Response) {
        const readOneUserByEmailRepository = new PrismaReadOneUserByEmailRepository();
        const createUserRepository = new PrismaCreateUserRepository();

        const createUserResource = new CreateUserResource(
            readOneUserByEmailRepository,
            createUserRepository
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
    }
}