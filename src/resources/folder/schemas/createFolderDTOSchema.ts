import { z as zod } from "zod";

/* eslint-disable camelcase */
export const createFolderDTOSchema = zod.object(
    {
        name: zod
            .string(
                {
                    required_error: "You must provide a folder name",
                    invalid_type_error: "The folder name must be a text",
                    description: "The folder name"
                }
            )
            .max(255, "The folder name is too long (must have a maximum of 255 characters)"),

        userId: zod
            .number(
                {
                    required_error: "You must provide an user ID",
                    invalid_type_error: "The user ID must be a number",
                    description: "The current user ID"
                }
            )
            .positive("The user ID must be a positive number")
            .int("The user ID must be an integer")
    }
);
/* eslint-enable camelcase */