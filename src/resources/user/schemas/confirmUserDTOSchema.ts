import { z as zod } from "zod";

/* eslint-disable camelcase */
export const confirmUserDTOSchema = zod.object(
    {
        token: zod
            .string(
                {
                    required_error: "You must provide a token",
                    invalid_type_error: "Your token must be a text",
                    description: "The account confirmation token"
                }
            )
            .uuid("Your token format is invalid")
    }
);
/* eslint-enable camelcase */