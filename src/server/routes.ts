import { Router } from "express";

import {
    userRouter
} from "@/routes";

const routes = Router();
routes.use(userRouter);

export { routes };