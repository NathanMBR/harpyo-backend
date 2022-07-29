import { z as zod } from "zod";

import { inactivateCurrentUserDTOSchema } from "./schemas";
import {
    ReadCurrentUserContract,
    InactivateCurrentUserContract
} from "@/repositories/user";
import { InternalServerError } from "@/errors";

type InactivateCurrentUserDTO = zod.infer<typeof inactivateCurrentUserDTOSchema>;

export class InactivateCurrentUserResource {
    constructor(
        private readonly readCurrentUserRepository: ReadCurrentUserContract,
        private readonly inactivateCurrentUserRepository: InactivateCurrentUserContract
    ) { }

    async execute(dto: InactivateCurrentUserDTO) {
        const userData = inactivateCurrentUserDTOSchema.parse(dto);

        const doesUserExist = await this.readCurrentUserRepository.readCurrent(
            {
                id: userData.id
            }
        );
        if (!doesUserExist)
            throw new InternalServerError("Authenticated as unknown user");

        await this.inactivateCurrentUserRepository.inactivateCurrent(userData);
    }
}