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
    private readonly readOneUserByEmailRepository = new PrismaReadOneUserByEmailRepository();
    private readonly createUserRepository = new PrismaCreateUserRepository();

    async handle(request: Request, response: Response) {
        const {
            name,
            email,
            password
        } = request.body;

        const createUserResource = new CreateUserResource(
            this.readOneUserByEmailRepository,
            this.createUserRepository
        );

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