import { z as zod } from "zod";
import { hash } from "bcryptjs";

import { updateUserPasswordByTokenDTOSchema } from "./schemas";
import {
    ReadOnePasswordResetByTokenContract,
    UpdatePasswordResetContract
} from "@/repositories/passwordReset";
import {
    ReadCurrentUserContract,
    UpdateCurrentUserPasswordContract
} from "@/repositories/user";
import {
    NotFoundError,
    UnauthorizedError
} from "@/errors";

type UpdateUserPasswordByTokenDTO = zod.infer<typeof updateUserPasswordByTokenDTOSchema>;

export class UpdateUserPasswordByTokenResource {
    constructor(
        private readonly readOnePasswordResetByTokenRepository: ReadOnePasswordResetByTokenContract,
        private readonly updatePasswordResetRepository: UpdatePasswordResetContract,
        private readonly readCurrentUserRepository: ReadCurrentUserContract,
        private readonly updateCurrentUserPasswordRepository: UpdateCurrentUserPasswordContract
    ) { }

    async execute(dto: UpdateUserPasswordByTokenDTO) {
        const {
            token,
            password
        } = updateUserPasswordByTokenDTOSchema.parse(dto);

        const passwordReset = await this.readOnePasswordResetByTokenRepository.findOneByToken(
            {
                token
            }
        );
        if (!passwordReset)
            throw new NotFoundError("Token not found");

        const {
            id: passwordResetId,
            userId
        } = passwordReset;
        const user = await this.readCurrentUserRepository.readCurrent(
            {
                id: userId
            }
        );
        if (!user)
            throw new UnauthorizedError("Unknown user");

        const hashedPassword = await hash(password, 16);
        await Promise.all(
            [
                this.updateCurrentUserPasswordRepository.updateCurrentPassword(
                    {
                        id: userId,
                        password: hashedPassword
                    }
                ),

                this.updatePasswordResetRepository.update(
                    {
                        id: passwordResetId,
                        resetedAt: new Date()
                    }
                )
            ]
        );

        return;
    }
}