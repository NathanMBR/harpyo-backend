import { z as zod } from "zod";

/* eslint-disable camelcase */
export const requestPasswordResetDTOSchema = zod.object(
    {
        email: zod
            .string(
                {
                    required_error: "You must provide an e-mail",
                    invalid_type_error: "Your e-mail must be a text"
                }
            )
            .email()
            .max(255, "Your e-mail is too long (must have a maximum of 255 characters)")
    }
);
/* eslint-enable camelcase */