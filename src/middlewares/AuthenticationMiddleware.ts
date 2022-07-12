import {
    Request,
    Response,
    NextFunction
} from "express";
import jwt from "jsonwebtoken";

import { GenericMiddlewareContract } from "./contracts";
import {
    BadRequestError,
    InternalServerError
} from "@/errors";
import { SECRET } from "@/settings";
import { controllerErrorHandler } from "@/handlers";

export class AuthenticationMiddleware implements GenericMiddlewareContract {
    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const authorization = request.headers.authorization;
            if (!authorization)
                throw new BadRequestError("Authorization header must be provided");

            const spaceCharacter = String.fromCharCode(32);
            const [tokenType, token] = authorization.split(spaceCharacter);
            if (tokenType !== "Bearer")
                throw new BadRequestError("Authorization token must be a bearer token");
            if (!token)
                throw new BadRequestError("Authorization token must be provided");

            const tokenData = jwt.verify(
                token,
                SECRET
            );

            if (typeof tokenData === "string")
                throw new InternalServerError("Authorization token data is a string");

            const userId = Number(tokenData.sub);
            if (Number.isNaN(userId))
                throw new InternalServerError("Authorization token subject isn't a number");

            if (!tokenData.exp)
                throw new InternalServerError("Authorization token expiration time is missing");

            request.user = {
                sub: userId,
                exp: tokenData.exp
            };

            return next();
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}