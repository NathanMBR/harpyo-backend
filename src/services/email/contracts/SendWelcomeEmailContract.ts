export namespace SendWelcomeEmailContract {
    export interface Request {
        from: {
            name: string;
            email: string;
        };
        to: {
            name: string;
            email: string;
        };
        confirmAccountURL: string;
    }

    export type Response = void;
}

export interface SendWelcomeEmailContract {
    sendWelcomeEmail: (data: SendWelcomeEmailContract.Request) => Promise<SendWelcomeEmailContract.Response>;
}