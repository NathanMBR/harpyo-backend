import { z as zod } from "zod";

/* eslint-disable camelcase */
export const findOneDocumentDTOSchema = zod.object(
    {
        id: zod
            .number(
                {
                    required_error: "The document ID is required",
                    invalid_type_error: "The document ID must be a number",
                    description: "The document ID"
                }
            )
            .int("The document ID must be an integer")
            .positive("The document ID must be positive"),

        userId: zod
            .number(
                {
                    required_error: "The current user ID is required",
                    invalid_type_error: "The current user ID must be a number",
                    description: "The current user ID"
                }
            )
            .int("The current user ID must be an integer")
            .positive("The current user ID must be positive")
    }
);
/* eslint-enable camelcase */