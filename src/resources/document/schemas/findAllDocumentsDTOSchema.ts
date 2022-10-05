import { z as zod } from "zod";

/* eslint-disable camelcase */
export const findAllDocumentsDTOSchema = zod.object(
    {
        userId: zod
            .number(
                {
                    required_error: "The current user ID is required",
                    invalid_type_error: "The current user ID must be a number",
                    description: "The current user ID"
                }
            )
            .int("The current user ID must be an integer")
            .positive("The current user ID must be positive"),

        folderId: zod
            .number(
                {
                    required_error: "The folder ID is required",
                    invalid_type_error: "The folder ID must be a number",
                    description: "The folder ID"
                }
            )
            .int("The folder ID must be an integer")
            .positive("The folder ID must be positive")
            .nullable()
            .optional(),

        page: zod
            .number(
                {
                    invalid_type_error: "The folder page must be a number",
                    description: "The page of the folders data"
                }
            )
            .int("The folder page must be an integer")
            .positive("The folder page must be positive")
            .optional(),

        quantity: zod
            .number(
                {
                    invalid_type_error: "The folders quantity must be a number",
                    description: "The quantity of folders to be returned"
                }
            )
            .int("The folders quantity must be an integer")
            .positive("The folders quantity must be positive")
            .optional(),

        orderColumn: zod
            .enum(
                [
                    "id",
                    "updatedAt"
                ],

                {
                    invalid_type_error: "The order column must be a string",
                    description: "The column to order by"
                }
            )
            .optional(),

        orderBy: zod
            .enum(
                [
                    "asc",
                    "desc"
                ],

                {
                    required_error: "The order direction is required",
                    invalid_type_error: "The order direction must be a text",
                    description: "The order direction"
                }
            ),

        search: zod
            .string(
                {
                    required_error: "The search query is required",
                    invalid_type_error: "The search query must be a string",
                    description: "The search query"
                }
            )
            .max(255, "The search query is too long (must have a maximum of 255 characters)")
    }
);
/* eslint-enable camelcase */