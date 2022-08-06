import { z as zod } from "zod";

/* eslint-disable camelcase */
export const readNewestEmailConfirmationByUserIdDTOSchema = zod.object(
    {
        userId: zod.number(
            {
                required_error: "The user ID is required",
                invalid_type_error: "The user ID must be a number"
            }
        )
    }
);
/* eslint-enable camelcase */