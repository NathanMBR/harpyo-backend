import { Router } from "express";

import {
    userRouter,
    folderRouter
} from "@/routes";

const routes = Router();
routes.use(userRouter);
routes.use(folderRouter);

export { routes };