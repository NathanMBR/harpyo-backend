import {
    Request,
    Response
} from "express";

export namespace GenericControllerContract {
    export type HandlerMethod = (request: Request, response: Response) => Promise<Response>
}

export interface GenericControllerContract {
    handle: GenericControllerContract.HandlerMethod
}