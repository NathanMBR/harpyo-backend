import path from "path";
import fs from "fs/promises";

import { SendEmailConfirmationEmailContract } from "../contracts";
import { nodemailerTransport } from "@/settings";
import { removeHTMLTagsHelper } from "@/helpers";

export class NodeMailerSendEmailConfirmationEmailService implements SendEmailConfirmationEmailContract {
    async send(data: SendEmailConfirmationEmailContract.Request) {
        const emailConfirmationTemplatePath = path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "views",
            "changeEmail.html"
        );

        const emailConfirmationEmailTemplate = await fs.readFile(emailConfirmationTemplatePath);
        const emailConfirmationEmail = emailConfirmationEmailTemplate
            .toString()
            .replaceAll("{name}", data.to.name)
            .replaceAll("{changeEmailURL}", data.confirmEmailURL);

        await nodemailerTransport.sendMail(
            {
                from: `${data.from.name} <${data.from.email}>`,
                to: data.to.email,
                subject: "Please confirm your e-mail change",
                html: emailConfirmationEmail,
                text: removeHTMLTagsHelper(emailConfirmationEmail)
            }
        );
    }
}