import { z as zod } from "zod";

/* eslint-disable camelcase */
export const updateUserEmailByTokenDTOSchema = zod.object(
    {
        token: zod
            .string(
                {
                    required_error: "You must provide a token",
                    invalid_type_error: "Your token must be a text",
                    description: "The token to change the account email"
                }
            )
            .uuid("Your token must be a valid v4 UUID"),

        userId: zod
            .number(
                {
                    required_error: "You must provide a user ID",
                    invalid_type_error: "Your user ID must be a number",
                    description: "The account ID"
                }
            )
            .int("Your user ID must be an integer")
            .positive("Your user ID must be a positive number"),

        email: zod
            .string(
                {
                    required_error: "You must provide your new email",
                    invalid_type_error: "Your new email must be a text",
                    description: "The new account email"
                }
            )
            .email("Your new email must be a valid email")
            .max(255, "Your new email is too long (must have a maximum of 255 characters)")
    }
);
/* eslint-enable camelcase */