import { Router } from "express";

import {
    CreateFolderController
} from "@/controllers/folder";
import {
    AuthenticationMiddleware,
    ConfirmedAccountMiddleware
} from "@/middlewares";

const folderRouter = Router();
const authenticationMiddleware = new AuthenticationMiddleware().handle;
const confirmedAccountMiddleware = new ConfirmedAccountMiddleware().handle;

folderRouter.post(
    "/folder/create",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new CreateFolderController().handle
);

export { folderRouter };