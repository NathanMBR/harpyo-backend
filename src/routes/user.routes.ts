import { Router } from "express";

import {
    CreateUserController,
    ReadCurrentUserController,
    UpdateCurrentUserController,
    InactivateCurrentUserController
} from "@/controllers/user";
import { AuthenticationMiddleware } from "@/middlewares";

const userRouter = Router();
const authenticationMiddleware = new AuthenticationMiddleware().handle;

userRouter.post(
    "/user/create",
    new CreateUserController().handle
);

userRouter.get(
    "/user/get",
    authenticationMiddleware,
    new ReadCurrentUserController().handle
);

userRouter.put(
    "/user/update",
    authenticationMiddleware,
    new UpdateCurrentUserController().handle
);

userRouter.delete(
    "/user/delete",
    authenticationMiddleware,
    new InactivateCurrentUserController().handle
);

export { userRouter };