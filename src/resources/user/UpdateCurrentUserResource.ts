import { z as zod } from "zod";

import { updateCurrentUserDTOSchema } from "./schemas";
import {
    ReadCurrentUserContract,
    UpdateCurrentUserContract
} from "@/repositories/user";
import { InternalServerError } from "@/errors";

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
            throw new InternalServerError("Authenticated as unknown user");

        const user = await this.updateCurrentUserRepository.updateCurrent(userData);
        return user;
    }
}