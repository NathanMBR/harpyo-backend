import { Router } from "express";

import {
    CreateDocumentController,
    FindAllDocumentsController
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

export { documentRouter };