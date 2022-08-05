import { z as zod } from "zod";

import { updateCurrentUserDTOSchema } from "./schemas";
import {
    ReadCurrentUserContract,
    UpdateCurrentUserContract
} from "@/repositories/user";
import { UnauthorizedError } from "@/errors";
import { removePropertiesHelper } from "@/helpers";

type UpdateCurrentUserDTO = zod.infer<typeof updateCurrentUserDTOSchema>;

export class UpdateCurrentUserResource {
    constructor(
        private readonly readCurrentUserRepository: ReadCurrentUserContract,
        private readonly updateCurrentUserRepository: UpdateCurrentUserContract
    ) { }

    async execute(dto: UpdateCurrentUserDTO) {
        const userData = updateCurrentUserDTOSchema.parse(dto);

        const doesUserExist = await this.readCurrentUserRepository.readCurrent(
            {
                id: userData.id
            }
        );
        if (!doesUserExist)
            throw new UnauthorizedError("Authenticated as unknown user");

        const unsafeUser = await this.updateCurrentUserRepository.updateCurrent(userData);
        const user = removePropertiesHelper(
            unsafeUser,
            "password"
        );

        return user;
    }
}