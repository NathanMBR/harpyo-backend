import { z as zod } from "zod";

/* eslint-disable camelcase */
export const updateFolderDTOSchema = zod.object(
    {
        id: zod
            .number(
                {
                    required_error: "You must provide a folder ID",
                    invalid_type_error: "The folder ID must be a number",
                    description: "The folder ID"
                }
            )
            .int("The folder ID must be an integer")
            .positive("The folder ID must be a positive number"),

        name: zod
            .string(
                {
                    required_error: "You must provide a folder name",
                    invalid_type_error: "The folder name must be a text",
                    description: "The folder name"
                }
            )
            .min(1, "The folder name is too short (must have a minimum of 1 character)")
            .max(255, "The folder name is too long (must have a maximum of 255 characters)"),

        userId: zod
            .number(
                {
                    required_error: "You must provide the current user ID",
                    invalid_type_error: "The current user ID must be a number",
                    description: "The current user ID"
                }
            )
            .int("The current user ID must be an integer")
            .positive("The current user ID must be a positive number")
    }
);
/* eslint-enable camelcase */