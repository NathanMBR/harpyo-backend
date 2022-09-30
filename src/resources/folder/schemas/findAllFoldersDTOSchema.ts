import { z as zod } from "zod";

/* eslint-disable camelcase */
export const findAllFoldersDTOSchema = zod.object(
    {
        userId: zod
            .number(
                {
                    required_error: "The current user ID is required",
                    invalid_type_error: "The current user ID must be a number",
                    description: "The current user ID"
                }
            ),

        skip: zod
            .number(
                {
                    required_error: "The skip amount is required",
                    invalid_type_error: "The skip amount must be a number",
                    description: "The skip amount"
                }
            )
            .int("The skip amount must be an integer")
            .positive("The skip amount must be positive"),

        take: zod
            .number(
                {
                    required_error: "The take amount is required",
                    invalid_type_error: "The take amount must be a number",
                    description: "The take amount"
                }
            )
            .int("The take amount must be an integer")
            .positive("The take amount must be positive"),

        orderColumn: zod
            .string(
                {
                    invalid_type_error: "The order column must be a string",
                    description: "The column to order by"
                }
            )
            .refine(
                orderColumn => orderColumn === "id" || orderColumn === "updatedAt",
                {
                    message: "The order column must be either \"id\" or \"updatedAt\""
                }
            )
            .optional(),

        orderBy: zod
            .string(
                {
                    required_error: "The order direction is required",
                    invalid_type_error: "The order direction must be a string",
                    description: "The order direction"
                }
            )
            .refine(
                orderBy => orderBy === "asc" || orderBy === "desc",
                {
                    message: "The order direction must be either \"asc\" or \"desc\""
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