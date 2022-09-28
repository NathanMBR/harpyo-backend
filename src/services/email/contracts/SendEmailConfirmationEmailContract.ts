export namespace SendEmailConfirmationEmailContract {
    export interface Request {
        from: {
            name: string;
            email: string;
        };
        to: {
            name: string;
            email: string;
        };
        confirmEmailURL: string;
    }

    export type Response = void;
}

export interface SendEmailConfirmationEmailContract {
    send: (data: SendEmailConfirmationEmailContract.Request) => Promise<SendEmailConfirmationEmailContract.Response>;
}