import { z as zod } from "zod";

/* eslint-disable camelcase */
export const updateCurrentUserDTOSchema = zod.object(
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

        name: zod
            .string(
                {
                    required_error: "You must provide a name",
                    invalid_type_error: "Your name must be a text"
                }
            )
            .min(3, "Your name is too short (must have a minimum of 3 characters)")
            .max(255, "Your name is too long (must have a maximum of 255 characters)")
    }
);
/* eslint-enable camelcase */