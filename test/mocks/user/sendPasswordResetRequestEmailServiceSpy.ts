import { jest } from "@jest/globals";

import { SendPasswordResetRequestEmailContract } from "@/services/email";

export const sendPasswordResetRequestEmailServiceSpy = jest.fn<SendPasswordResetRequestEmailContract["send"]>(
    async _data => Promise.resolve()
);