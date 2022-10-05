import { Router } from "express";

import {
    CreateDocumentController,
    FindAllDocumentsController,
    FindOneDocumentController
} from "@/controllers/document";
import {
    AuthenticationMiddleware,
    ConfirmedAccountMiddleware
} from "@/middlewares";

const documentRouter = Router();
const authenticationMiddleware = new AuthenticationMiddleware().handle;
const confirmedAccountMiddleware = new ConfirmedAccountMiddleware().handle;

documentRouter.post(
    "/document/create",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new CreateDocumentController().handle
);

documentRouter.get(
    "/document/all",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new FindAllDocumentsController().handle
);

documentRouter.get(
    "/document/get/:id",
    authenticationMiddleware,
    confirmedAccountMiddleware,
    new FindOneDocumentController().handle
);

export { documentRouter };