import { z as zod } from "zod";

/* eslint-disable camelcase */
export const createUserDTOSchema = zod.object(
    {
        name: zod
            .string(
                {
                    required_error: "You must provide a name",
                    invalid_type_error: "Your name must be a text"
                }
            )
            .min(3, "Your name is too short (must have a minimum of 3 characters)")
            .max(255, "Your name is too long (must have a maximum of 255 characters)"),

        email: zod
            .string(
                {
                    required_error: "You must provide an e-mail",
                    invalid_type_error: "Your e-mail must be a text"
                }
            )
            .email("Your e-mail format is invalid")
            .max(255, "Your e-mail is too long (must have a maximum of 255 characters)"),

        password: zod
            .string(
                {
                    required_error: "You must provide a password",
                    invalid_type_error: "Your password must be a text"
                }
            )
            .min(8, "Your password is too short (must have a minimum of 8 characters)")
    }
);
/* eslint-enable camelcase */