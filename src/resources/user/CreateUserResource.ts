import { z as zod } from "zod";
import { hash } from "bcryptjs";

import { createUserDTOSchema } from "./schemas";
import {
    ReadOneUserByEmailContract,
    CreateUserContract
} from "@/repositories/user";
import { BadRequestError } from "@/errors";
import { removePropertiesHelper } from "@/helpers";

type CreateUserDTO = zod.infer<typeof createUserDTOSchema>;

export class CreateUserResource {
    constructor(
        private readonly readOneUserByEmailRepository: ReadOneUserByEmailContract,
        private readonly createUserRepository: CreateUserContract
    ) { }

    async execute(dto: CreateUserDTO) {
        const userData = createUserDTOSchema.parse(dto);

        const doesEmailAlreadyExists = await this.readOneUserByEmailRepository.readOneByEmail(
            {
                email: dto.email
            }
        );
        if (doesEmailAlreadyExists)
            throw new BadRequestError("Your e-mail is already in use");

        const hashedPassword = await hash(userData.password, 16);
        userData.password = hashedPassword;

        const user = await this.createUserRepository.create(userData);
        const userWithoutUnsafeData = removePropertiesHelper(user, "password");

        return userWithoutUnsafeData;
    }
}