import { z as zod } from "zod";
import {
    compare,
    hash
} from "bcryptjs";

import { updateCurrentUserPasswordDTOSchema } from "./schemas";
import {
    ReadCurrentUserContract,
    UpdateCurrentUserPasswordContract
} from "@/repositories/user";
import { CreatePasswordResetContract } from "@/repositories/passwordReset";
import {
    BadRequestError,
    UnauthorizedError
} from "@/errors";
import { removePropertiesHelper } from "@/helpers";

type UpdateCurrentUserPasswordDTO = zod.infer<typeof updateCurrentUserPasswordDTOSchema>;

export class UpdateCurrentUserPasswordResource {
    constructor(
        private readonly readCurrentUserRepository: ReadCurrentUserContract,
        private readonly updateCurrentUserPasswordRepository: UpdateCurrentUserPasswordContract,
        private readonly createPasswordResetRepository: CreatePasswordResetContract
    ) { }

    async execute(dto: UpdateCurrentUserPasswordDTO) {
        const userData = updateCurrentUserPasswordDTOSchema.parse(dto);

        const doesUserExist = await this.readCurrentUserRepository.readCurrent(
            {
                id: userData.id
            }
        );
        if (!doesUserExist)
            throw new UnauthorizedError("Authenticated as unknown user");

        const doesCurrentPasswordMatch = await compare(userData.currentPassword, doesUserExist.password);
        if (!doesCurrentPasswordMatch)
            throw new BadRequestError("Invalid current password");

        const password = await hash(userData.newPassword, 16);
        const unsafeUser = await this.updateCurrentUserPasswordRepository.updateCurrentPassword(
            {
                id: userData.id,
                password
            }
        );

        await this.createPasswordResetRepository.create(
            {
                userId: userData.id,
                resetedAt: new Date(),
                method: "CHANGE"
            }
        );

        const user = removePropertiesHelper(
            unsafeUser,
            "password"
        );

        return user;
    }
}