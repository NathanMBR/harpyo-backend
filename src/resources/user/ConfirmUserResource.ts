import { z as zod } from "zod";

import { confirmUserDTOSchema } from "./schemas";
import {
    ReadCurrentUserContract,
    ConfirmUserContract
} from "@/repositories/user";
import {
    FindOneEmailConfirmationByTokenContract,
    ConfirmEmailConfirmationContract
} from "@/repositories/emailConfirmation";
import { NotFoundError } from "@/errors";
import { removePropertiesHelper } from "@/helpers";

type ConfirmUserDTO = zod.infer<typeof confirmUserDTOSchema>;

export class ConfirmUserResource {
    constructor(
        private readonly findOneEmailConfirmationByTokenRepository: FindOneEmailConfirmationByTokenContract,
        private readonly readCurrentUserRepository: ReadCurrentUserContract,
        private readonly confirmUserRepository: ConfirmUserContract,
        private readonly confirmEmailConfirmationRepository: ConfirmEmailConfirmationContract
    ) { }

    async execute(dto: ConfirmUserDTO) {
        const userData = confirmUserDTOSchema.parse(dto);
        const { token } = userData;

        const tokenNotFoundMessage = "Token not found";

        const emailConfirmation = await this.findOneEmailConfirmationByTokenRepository.findOneByToken(
            {
                token
            }
        );
        if (!emailConfirmation)
            throw new NotFoundError(tokenNotFoundMessage);

        const userId = emailConfirmation.userId;
        const user = await this.readCurrentUserRepository.readCurrent(
            {
                id: userId
            }
        );
        if (!user)
            throw new NotFoundError(tokenNotFoundMessage);

        await Promise.all(
            [
                this.confirmUserRepository.confirm(
                    {
                        id: userId
                    }
                ),

                this.confirmEmailConfirmationRepository.confirm(
                    {
                        id: emailConfirmation.id
                    }
                )
            ]
        );

        const safeUser = removePropertiesHelper(
            user,
            "password"
        );

        return safeUser;
    }
}