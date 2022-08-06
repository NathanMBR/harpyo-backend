import { z as zod } from "zod";

import { readNewestEmailConfirmationByUserIdDTOSchema } from "./schemas";
import { ReadNewestEmailConfirmationByUserIdContract } from "@/repositories/emailConfirmation";
import { NotFoundError } from "@/errors";

type ReadNewestEmailConfirmationByUserIdDTO = zod.infer<typeof readNewestEmailConfirmationByUserIdDTOSchema>;

export class ReadNewestEmailConfirmationByUserIdResource {
    constructor(
        private readonly readNewestEmailConfirmationByUserIdRepository: ReadNewestEmailConfirmationByUserIdContract
    ) {}

    async execute(dto: ReadNewestEmailConfirmationByUserIdDTO) {
        const { userId } = readNewestEmailConfirmationByUserIdDTOSchema.parse(dto);

        const emailConfirmation = await this.readNewestEmailConfirmationByUserIdRepository.readNewestByUserId(
            {
                userId
            }
        );
        if (!emailConfirmation)
            throw new NotFoundError("Email confirmation not found");

        return emailConfirmation;
    }
}