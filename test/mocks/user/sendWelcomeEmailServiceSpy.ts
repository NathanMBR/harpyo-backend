import { jest } from "@jest/globals";

import { SendWelcomeEmailContract } from "@/services/email";

export const sendWelcomeEmailServiceSpy = jest.fn<SendWelcomeEmailContract["send"]>(
    async _data => Promise.resolve()
);