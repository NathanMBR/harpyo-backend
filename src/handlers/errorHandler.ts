import { HttpError } from "@/errors";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: unknown,
    request: Request,
    response: Response,
    _next: NextFunction
) => {
    if (error instanceof HttpError && error.statusCode !== 500)
        return response.status(error.statusCode).json(
            {
                statusCode: error.statusCode,
                message: error.message
            }
        );

    console.log(error instanceof HttpError ? error.message : error instanceof Error ? error.stack : error);
    return response.status(500).json(
        {
            statusCode: 500,
            message: "Internal server error"
        }
    );
};