import { HttpError } from "./base/HttpError";

export class BadRequestError extends HttpError {
    constructor(
        public readonly message: string
    ) {
        super(400, message);
    }
}