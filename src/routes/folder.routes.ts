import { Router } from "express";

import {
    CreateFolderController,
    FindAllFoldersController,
    FindOneFolderController,
    UpdateFolderController,
    InactivateFolderController
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

folderRouter.get(
    "/folder/all",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new FindAllFoldersController().handle
);

folderRouter.get(
    "/folder/get/:id",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new FindOneFolderController().handle
);

folderRouter.put(
    "/folder/update/:id",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new UpdateFolderController().handle
);

folderRouter.delete(
    "/folder/inactivate/:id",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new InactivateFolderController().handle
);

export { folderRouter };