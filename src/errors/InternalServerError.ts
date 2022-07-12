import { HttpError } from "./base";

export class InternalServerError extends HttpError {
    constructor(
        public readonly message: string
    ) {
        super(500, message);
    }
}