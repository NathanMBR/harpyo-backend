import {
    Request,
    Response,
    NextFunction
} from "express";

import { GenericMiddlewareContract } from "./contracts";
import {
    UnauthorizedError,
    InternalServerError
} from "@/errors";
import { controllerErrorHandler } from "@/handlers";

export class ConfirmedAccountMiddleware implements GenericMiddlewareContract {
    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const userData = request.user;

            if (!userData)
                throw new InternalServerError("User data is missing");

            if (!userData.isConfirmed)
                throw new UnauthorizedError("You must confirm your account to access this content");

            return next();
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}