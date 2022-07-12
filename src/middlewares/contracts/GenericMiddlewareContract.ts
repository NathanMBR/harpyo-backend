import {
    Request,
    Response,
    NextFunction
} from "express";

export namespace GenericMiddlewareContract {
    export type HandlerMethod = (
        request: Request,
        response: Response,
        next: NextFunction
    ) => Promise<Response | NextFunction>;
}

export interface GenericMiddlewareContract {
    handle: GenericMiddlewareContract.HandlerMethod;
}