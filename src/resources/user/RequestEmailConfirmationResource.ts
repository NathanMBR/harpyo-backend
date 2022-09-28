import { z as zod } from "zod";

import { requestEmailConfirmationDTOSchema } from "./schemas";
import {
    ReadCurrentUserContract,
    ReadOneUserByEmailContract
} from "@/repositories/user";
import { CreateEmailConfirmationContract } from "@/repositories/emailConfirmation";
import { SendEmailConfirmationEmailContract } from "@/services/email";
import {
    BadRequestError,
    NotFoundError
} from "@/errors";
import {
    SMTP_FROM,
    HARPYO_BASE_URL
} from "@/settings";

type RequestEmailConfirmationDTO = zod.infer<typeof requestEmailConfirmationDTOSchema>;

export class RequestEmailConfirmationResource {
    constructor(
        private readonly readCurrentUserRepository: ReadCurrentUserContract,
        private readonly readOneUserByEmailRepository: ReadOneUserByEmailContract,
        private readonly createEmailConfirmationRepository: CreateEmailConfirmationContract,
        private readonly sendEmailConfirmationEmailService: SendEmailConfirmationEmailContract
    ) { }

    async execute(dto: RequestEmailConfirmationDTO) {
        const userData = requestEmailConfirmationDTOSchema.parse(dto);
        const {
            userId,
            email
        } = userData;

        const currentUser = await this.readCurrentUserRepository.readCurrent(
            {
                id: userId
            }
        );

        if (!currentUser)
            throw new NotFoundError("Current user not found");

        if (currentUser.email === email)
            throw new BadRequestError("You're already using this email");

        const doesEmailAlreadyExists = await this.readOneUserByEmailRepository.readOneByEmail(
            {
                email
            }
        );

        if (doesEmailAlreadyExists)
            throw new BadRequestError("This email is already in use");

        const emailConfirmation = await this.createEmailConfirmationRepository.create(
            {
                userId,
                email
            }
        );

        await this.sendEmailConfirmationEmailService.send(
            {
                from: {
                    name: "The Harpyo Team",
                    email: SMTP_FROM
                },

                to: {
                    name: currentUser.name,
                    email
                },

                confirmEmailURL: `${HARPYO_BASE_URL}/update-email/${emailConfirmation.token}`
            }
        );

        return;
    }
}