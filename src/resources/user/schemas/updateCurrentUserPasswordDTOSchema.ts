import { z as zod } from "zod";

/* eslint-disable camelcase */
export const updateCurrentUserPasswordDTOSchema = zod.object(
    {
        id: zod
            .number(
                {
                    required_error: "You must provide your user ID",
                    invalid_type_error: "Your user ID must be a number"
                }
            )
            .positive("Your user ID must be greater than or equal 1")
            .int("Your user ID must be an integer"),

        currentPassword: zod
            .string(
                {
                    required_error: "You must provide your current password",
                    invalid_type_error: "Your current password must be a text"
                }
            )
            .min(8, "Your current password is too short (must have a minimum of 8 characters)")
            .max(255, "Your current password is too long (must have a maximum of 255 characters)"),

        newPassword: zod
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