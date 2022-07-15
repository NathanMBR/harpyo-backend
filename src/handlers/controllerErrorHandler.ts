import { Response } from "express";
import { ZodError } from "zod";
import {
    TokenExpiredError,
    JsonWebTokenError,
    NotBeforeError
} from "jsonwebtoken";

import { HttpError } from "@/errors";

export const controllerErrorHandler = (
    response: Response,
    error: unknown
) => {
    if (error instanceof HttpError && error.statusCode !== 500)
        return response.status(error.statusCode).json(
            {
                error: error.message,
                statusCode: error.statusCode
            }
        );

    if (error instanceof ZodError)
        return response.status(400).json(
            {
                error: "Validation error",
                statusCode: 400,
                reasons: error.issues.map(issue => issue.message)
            }
        );

    if (error instanceof TokenExpiredError)
        return response.status(401).json(
            {
                error: "Your session has expired, please authenticate again",
                statusCode: 401
            }
        );

    if (error instanceof JsonWebTokenError)
        return response.status(401).json(
            {
                error: "Invalid authentication token",
                statusCode: 401
            }
        );

    if (error instanceof NotBeforeError)
        return response.status(401).json(
            {
                error: "This resource isn't available yet",
                statusCode: 401
            }
        );

    console.log(error instanceof HttpError ? error.message : error instanceof Error ? error.stack : error);
    return response.status(500).json(
        {
            error: "Internal server error",
            statusCode: 500
        }
    );
};