import { Router } from "express";

import {
    userRouter,
    folderRouter,
    documentRouter
} from "@/routes";

const routes = Router();
routes.use(userRouter);
routes.use(folderRouter);
routes.use(documentRouter);

export { routes };