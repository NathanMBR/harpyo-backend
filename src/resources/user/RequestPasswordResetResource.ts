import { z as zod } from "zod";

import { requestPasswordResetDTOSchema } from "./schemas";
import { ReadOneUserByEmailContract } from "@/repositories/user";
import { CreatePasswordResetContract } from "@/repositories/passwordReset";
import { SendPasswordResetRequestEmailContract } from "@/services/email";
import {
    SMTP_FROM,
    HARPYO_BASE_URL
} from "@/settings";

type RequestPasswordResetDTO = zod.infer<typeof requestPasswordResetDTOSchema>;

export class RequestPasswordResetResource {
    constructor(
        private readonly readOneUserByEmailRepository: ReadOneUserByEmailContract,
        private readonly createPasswordResetRepository: CreatePasswordResetContract,
        private readonly sendPasswordResetRequestEmailService: SendPasswordResetRequestEmailContract
    ) { }

    async execute(dto: RequestPasswordResetDTO) {
        const userData = requestPasswordResetDTOSchema.parse(dto);
        const { email } = userData;

        const doesEmailExists = await this.readOneUserByEmailRepository.readOneByEmail(
            {
                email
            }
        );

        if (doesEmailExists) {
            const passwordReset = await this.createPasswordResetRepository.create(
                {
                    userId: doesEmailExists.id,
                    method: "RESET",
                    resetedAt: null
                }
            );

            await this.sendPasswordResetRequestEmailService.send(
                {
                    from: {
                        name: "The Harpyo Team",
                        email: SMTP_FROM
                    },

                    to: {
                        name: doesEmailExists.name,
                        email
                    },

                    resetPasswordURL: `${HARPYO_BASE_URL}/reset-password/${passwordReset.token}`
                }
            );
        }

        return;
    }
}