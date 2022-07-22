import { z as zod } from "zod";

import { readCurrentUserDTOSchema } from "./schemas";
import {
    ReadCurrentUserContract
} from "@/repositories/user";
import { InternalServerError } from "@/errors";
import { removePropertiesHelper } from "@/helpers";

type ReadCurrentUserDTO = zod.infer<typeof readCurrentUserDTOSchema>;

export class ReadCurrentUserResource {
    constructor(
        private readonly readCurrentUserRepository: ReadCurrentUserContract
    ) { }

    async execute(dto: ReadCurrentUserDTO) {
        const authenticationData = readCurrentUserDTOSchema.parse(dto);

        const user = await this.readCurrentUserRepository.readCurrent(
            {
                id: authenticationData.id
            }
        );
        if (!user)
            throw new InternalServerError("Authenticated as unknown user");

        const userWithoutUnsafeData = removePropertiesHelper(user, "password");
        return userWithoutUnsafeData;
    }
}