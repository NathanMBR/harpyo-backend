import { Router } from "express";

import {
    CreateDocumentController
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

export { documentRouter };