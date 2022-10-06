import { z as zod } from "zod";

/* eslint-disable camelcase */
export const updateDocumentDTOSchema = zod.object(
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

        title: zod
            .string(
                {
                    required_error: "You must provide a document title",
                    invalid_type_error: "The document title must be a text",
                    description: "The document title"
                }
            )
            .min(1, "The document title is too short (must have a minimum of 1 character)")
            .max(255, "The document title is too long (must have a maximum of 255 characters)"),

        text: zod
            .string(
                {
                    invalid_type_error: "The document text must be a text",
                    description: "The document text"
                }
            )
            .nullable(),

        folderId: zod
            .number(
                {
                    invalid_type_error: "The folder ID must be a number",
                    description: "The folder ID"
                }
            )
            .int("The folder ID must be an integer")
            .positive("The folder ID must be positive")
            .nullable(),

        userId: zod
            .number(
                {
                    required_error: "You must provide an user ID",
                    invalid_type_error: "The user ID must be a number",
                    description: "The current user ID"
                }
            )
            .int("The user ID must be an integer")
            .positive("The user ID must be positive"),

        isEncrypted: zod
            .boolean(
                {
                    required_error: "You must set the document as encrypted or not",
                    invalid_type_error: "The document encryption status must be a boolean",
                    description: "The document encryption status"
                }
            )
    }
);
/* eslint-enable camelcase */