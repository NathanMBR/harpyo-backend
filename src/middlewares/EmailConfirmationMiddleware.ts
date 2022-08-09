import {
    Request,
    Response,
    NextFunction
} from "express";

import { GenericMiddlewareContract } from "./contracts";
import { PrismaReadNewestEmailConfirmationByUserIdRepository } from "@/repositories/emailConfirmation";
import { ReadNewestEmailConfirmationByUserIdResource } from "@/resources/emailConfirmation";
import { controllerErrorHandler } from "@/handlers";
import {
    InternalServerError,
    UnauthorizedError
} from "@/errors";

export class EmailConfirmationMiddleware implements GenericMiddlewareContract {
    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const userData = request.user;
            if (!userData)
                throw new InternalServerError("User must be authenticated");

            const readNewestEmailConfirmationByUserIdRepository = new PrismaReadNewestEmailConfirmationByUserIdRepository();
            const readNewestEmailConfirmationByUserIdResource = new ReadNewestEmailConfirmationByUserIdResource(
                readNewestEmailConfirmationByUserIdRepository
            );

            const emailConfirmation = await readNewestEmailConfirmationByUserIdResource.execute(
                {
                    userId: userData.sub
                }
            );
            if (!emailConfirmation.confirmedAt)
                throw new UnauthorizedError("User e-mail must be confirmed");

            return next();
        } catch (error) {
            return controllerErrorHandler(response, error);
        }
    }
}