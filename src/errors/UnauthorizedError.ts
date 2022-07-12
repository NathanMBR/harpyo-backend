import { HttpError } from "./base";

export class UnauthorizedError extends HttpError {
    constructor(
        public readonly message: string
    ) {
        super(401, message);
    }
}