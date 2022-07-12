import { Router } from "express";

import {
    CreateUserController,
    ReadCurrentUserController
} from "@/controllers/user";

import { AuthenticationMiddleware } from "@/middlewares";

const userRouter = Router();

userRouter.post(
    "/user/create",
    new CreateUserController().handle
);

userRouter.get(
    "/user/get",
    new AuthenticationMiddleware().handle,
    new ReadCurrentUserController().handle
);

export { userRouter };