import { HttpError } from "./base/HttpError";

export class NotFoundError extends HttpError {
    constructor(
        public readonly message: string
    ) {
        super(404, message);
    }
}