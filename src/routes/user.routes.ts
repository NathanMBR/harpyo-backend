import { Router } from "express";

import {
    CreateUserController,
    ReadCurrentUserController,
    UpdateCurrentUserController,
    InactivateCurrentUserController,
    AuthenticateUserController,
    ConfirmUserController,
    UpdateCurrentUserPasswordController,
    UpdateUserPasswordByTokenController
} from "@/controllers/user";
import {
    AuthenticationMiddleware,
    ConfirmedAccountMiddleware
} from "@/middlewares";

const userRouter = Router();
const authenticationMiddleware = new AuthenticationMiddleware().handle;
const confirmedAccountMiddleware = new ConfirmedAccountMiddleware().handle;

userRouter.post(
    "/user/create",
    new CreateUserController().handle
);

userRouter.get(
    "/user/get",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new ReadCurrentUserController().handle
);

userRouter.put(
    "/user/update",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new UpdateCurrentUserController().handle
);

userRouter.delete(
    "/user/delete",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new InactivateCurrentUserController().handle
);

userRouter.post(
    "/user/authenticate",
    new AuthenticateUserController().handle
);

userRouter.post(
    "/user/confirm/:token",
    new ConfirmUserController().handle
);

userRouter.put(
    "/user/update-password",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new UpdateCurrentUserPasswordController().handle
);

userRouter.put(
    "/user/reset-password/:token",
    new UpdateUserPasswordByTokenController().handle
);

export { userRouter };