import { z as zod } from "zod";

/* eslint-disable camelcase */
export const requestEmailConfirmationDTOSchema = zod.object(
    {
        userId: zod
            .number(
                {
                    required_error: "You must provide a user ID",
                    invalid_type_error: "Your user ID must be a number",
                    description: "The user ID"
                }
            )
            .int("Your user ID must be an integer")
            .positive("Your user ID must be a positive number"),

        email: zod
            .string(
                {
                    required_error: "You must provide an e-mail",
                    invalid_type_error: "Your e-mail must be a text",
                    description: "The e-mail address you want to migrate to"
                }
            )
            .email("Your e-mail must be in a valid format")
            .max(255, "Your e-mail is too long (must have a maximum of 255 characters)")
    }
);
/* eslint-enable camelcase */