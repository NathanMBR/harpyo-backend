import { z as zod } from "zod";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { authenticateUserDTOSchema } from "./schemas";
import { ReadOneUserByEmailContract } from "@/repositories/user";
import { BadRequestError } from "@/errors";
import { removePropertiesHelper } from "@/helpers";
import { SECRET } from "@/settings";

type AuthenticateUserDTO = zod.infer<typeof authenticateUserDTOSchema>;

export class AuthenticateUserResource {
    constructor(
        private readonly readOneUserByEmailRepository: ReadOneUserByEmailContract
    ) { }

    async execute(dto: AuthenticateUserDTO) {
        const authenticationErrorMessage = "Your e-mail or password is incorrect";

        const userData = authenticateUserDTOSchema.parse(dto);
        const {
            email,
            password
        } = userData;

        const unsafeUser = await this.readOneUserByEmailRepository.readOneByEmail(
            {
                email
            }
        );
        if (!unsafeUser)
            throw new BadRequestError(authenticationErrorMessage);

        const isPasswordValid = await compare(password, unsafeUser.password);
        if (!isPasswordValid)
            throw new BadRequestError(authenticationErrorMessage);

        const isAccountConfirmed = !!unsafeUser.confirmedAt;

        const user = removePropertiesHelper(
            unsafeUser,
            "password"
        );

        const jwt = sign(
            {
                sub: user.id,
                isConfirmed: isAccountConfirmed
            },
            SECRET,
            {
                expiresIn: "7d"
            }
        );

        return {
            token: jwt,
            user
        };
    }
}