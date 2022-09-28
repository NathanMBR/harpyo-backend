import { jest } from "@jest/globals";

import { SendEmailConfirmationEmailContract } from "@/services/email";

export const sendEmailConfirmationEmailServiceSpy = jest.fn<SendEmailConfirmationEmailContract["send"]>(
    async _data => Promise.resolve()
);