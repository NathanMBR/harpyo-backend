import { z as zod } from "zod";

/* eslint-disable camelcase */
export const updateUserPasswordByTokenDTOSchema = zod.object(
    {
        token: zod
            .string(
                {
                    required_error: "You must provide a token",
                    invalid_type_error: "Your token must be a text"
                }
            )
            .uuid("Your token must be a valid v4 UUID"),

        password: zod
            .string(
                {
                    required_error: "You must provide your new password",
                    invalid_type_error: "Your new password must be a text"
                }
            )
            .min(8, "Your new password is too short (must have a minimum of 8 characters)")
            .max(255, "Your new password is too long (must have a maximum of 255 characters)")
    }
);