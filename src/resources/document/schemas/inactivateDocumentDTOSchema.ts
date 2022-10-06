import { z as zod } from "zod";

/* eslint-disable camelcase */
export const inactivateDocumentDTOSchema = zod.object(
    {
        id: zod
            .number(
                {
                    required_error: "You must provide a document ID",
                    invalid_type_error: "The document ID must be a number",
                    description: "The document ID"
                }
            )
            .int("The document ID must be an integer")
            .positive("The document ID must be positive"),

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