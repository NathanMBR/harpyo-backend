import { z as zod } from "zod";

/* eslint-disable camelcase */
export const authenticateUserDTOSchema = zod.object(
    {
        email: zod
            .string(
                {
                    required_error: "You must provide an e-mail",
                    invalid_type_error: "Your e-mail must be a text",
                    description: "The account e-mail"
                }
            )
            .email("Your e-mail format is invalid")
            .max(255, "Your e-mail is too long (must have a maximum of 255 characters)"),

        password: zod
            .string(
                {
                    required_error: "You must provide a password",
                    invalid_type_error: "Your password must be a text",
                    description: "The account password"
                }
            )
    }
);
/* eslint-enable camelcase */