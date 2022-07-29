import { z as zod } from "zod";

/* eslint-disable camelcase */
export const inactivateCurrentUserDTOSchema = zod.object(
    {
        id: zod
            .number(
                {
                    required_error: "You must provide your user ID",
                    invalid_type_error: "Your user ID must be a number"
                }
            )
            .positive("Your user ID must be greater than or equal 1")
            .int("Your user ID must be an integer")
    }
);
/* eslint-enable camelcase */