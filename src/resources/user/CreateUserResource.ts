import { z as zod } from "zod";
import { hash } from "bcryptjs";

import { createUserDTOSchema } from "./schemas";
import {
    ReadOneUserByEmailContract,
    CreateUserContract
} from "@/repositories/user";
import { SendWelcomeEmailContract } from "@/services/email";
import { BadRequestError } from "@/errors";
import { removePropertiesHelper } from "@/helpers";
import {
    SMTP_FROM,
    HARPYO_BASE_URL
} from "@/settings";

type CreateUserDTO = zod.infer<typeof createUserDTOSchema>;

export class CreateUserResource {
    constructor(
        private readonly readOneUserByEmailRepository: ReadOneUserByEmailContract,
        private readonly createUserRepository: CreateUserContract,
        private readonly sendWelcomeEmailService: SendWelcomeEmailContract
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

        await this.sendWelcomeEmailService.sendWelcomeEmail(
            {
                from: {
                    name: "The Harpyo Team",
                    email: SMTP_FROM
                },

                to: {
                    name: user.name,
                    email: user.email
                },

                confirmAccountURL: `${HARPYO_BASE_URL}/confirm-account/${user.emailConfirmation.token}`
            }
        );

        return userWithoutUnsafeData;
    }
}