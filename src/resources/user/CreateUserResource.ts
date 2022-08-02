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
        const {
            name,
            email,
            password
        } = userData;

        const doesEmailAlreadyExists = await this.readOneUserByEmailRepository.readOneByEmail(
            {
                email
            }
        );
        if (doesEmailAlreadyExists)
            throw new BadRequestError("Your e-mail is already in use");

        const hashedPassword = await hash(password, 16);
        const unsafeUser = await this.createUserRepository.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );
        await this.sendWelcomeEmailService.send(
            {
                from: {
                    name: "The Harpyo Team",
                    email: SMTP_FROM
                },

                to: {
                    name,
                    email
                },

                confirmAccountURL: `${HARPYO_BASE_URL}/confirm-account/${unsafeUser.emailConfirmation.token}`
            }
        );

        const unsafeProperties: Array<keyof typeof unsafeUser> = [
            "password",
            "emailConfirmation"
        ];
        const user = removePropertiesHelper(
            unsafeUser,
            ...unsafeProperties
        );

        return user;
    }
}