import path from "path";
import fs from "fs/promises";

import { SendPasswordResetRequestEmailContract } from "../contracts";
import { nodemailerTransport } from "@/settings";
import { removeHTMLTagsHelper } from "@/helpers";

export class NodeMailerSendPasswordResetRequestEmailService implements SendPasswordResetRequestEmailContract {
    async send(data: SendPasswordResetRequestEmailContract.Request) {
        const passwordResetTemplatePath = path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "views",
            "resetPasswordEmail.html"
        );

        const passwordResetEmailTemplate = await fs.readFile(passwordResetTemplatePath);
        const passwordResetEmail = passwordResetEmailTemplate
            .toString()
            .replaceAll("{name}", data.to.name)
            .replaceAll("{changePasswordURL}", data.resetPasswordURL);

        await nodemailerTransport.sendMail(
            {
                from: `${data.from.name} <${data.from.email}>`,
                to: data.to.email,
                subject: "Your password reset request",
                html: passwordResetEmail,
                text: removeHTMLTagsHelper(passwordResetEmail)
            }
        );
    }
}