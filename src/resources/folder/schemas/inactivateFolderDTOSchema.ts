import { z as zod } from "zod";

/* eslint-disable camelcase */
export const inactivateFolderDTOSchema = zod.object(
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
            .positive("The folder ID must be positive"),

        userId: zod
            .number(
                {
                    required_error: "You must provide a user ID",
                    invalid_type_error: "The user ID must be a number",
                    description: "The user ID"
                }
            )
            .int("The user ID must be an integer")
            .positive("The user ID must be positive")
    }
);
/* eslint-enable camelcase */