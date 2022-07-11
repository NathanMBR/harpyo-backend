import { Router } from "express";

import {
    CreateUserController
} from "@/controllers/user";

const userRouter = Router();

userRouter.post(
    "/user/create",
    new CreateUserController().handle
);

export { userRouter };