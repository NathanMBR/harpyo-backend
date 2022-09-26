export namespace SendPasswordResetRequestEmailContract {
    export interface Request {
        from: {
            name: string;
            email: string;
        };
        to: {
            name: string;
            email: string;
        };
        resetPasswordURL: string;
    }

    export type Response = void;
}

export interface SendPasswordResetRequestEmailContract {
    send: (data: SendPasswordResetRequestEmailContract.Request) => Promise<SendPasswordResetRequestEmailContract.Response>;
}