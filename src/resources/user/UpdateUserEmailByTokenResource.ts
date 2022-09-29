import { z as zod } from "zod";

import { updateUserEmailByTokenDTOSchema } from "./schemas";
import {
    FindOneEmailConfirmationByTokenContract,
    ConfirmEmailConfirmationContract
} from "@/repositories/emailConfirmation";
import { UpdateCurrentUserEmailContract } from "@/repositories/user";
import {
    UnauthorizedError,
    NotFoundError
} from "@/errors";

type UpdateUserEmailByTokenDTO = zod.infer<typeof updateUserEmailByTokenDTOSchema>;

export class UpdateUserEmailByTokenResource {
    constructor(
        private readonly findOneEmailConfirmationByTokenRepository: FindOneEmailConfirmationByTokenContract,
        private readonly confirmEmailConfirmationRepository: ConfirmEmailConfirmationContract,
        private readonly updateCurrentUserEmailRepository: UpdateCurrentUserEmailContract
    ) { }

    async execute(dto: UpdateUserEmailByTokenDTO) {
        const {
            token,
            userId,
            email
        } = updateUserEmailByTokenDTOSchema.parse(dto);

        const emailConfirmation = await this.findOneEmailConfirmationByTokenRepository.findOneByToken(
            {
                token
            }
        );

        if (!emailConfirmation)
            throw new NotFoundError("Token not found");

        if (emailConfirmation.userId !== userId)
            throw new UnauthorizedError("The current email change request doesn't belong to the current user");

        await this.confirmEmailConfirmationRepository.confirm(
            {
                id: emailConfirmation.id
            }
        );

        await this.updateCurrentUserEmailRepository.updateCurrentEmail(
            {
                id: userId,
                email
            }
        );
    }
}