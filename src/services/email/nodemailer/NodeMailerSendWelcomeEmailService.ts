import path from "path";
import fs from "fs/promises";

import { SendWelcomeEmailContract } from "../contracts";
import { nodemailerTransport } from "@/settings";
import { removeHTMLTagsHelper } from "@/helpers";

export class NodeMailerSendWelcomeEmailService implements SendWelcomeEmailContract {
    async send(data: SendWelcomeEmailContract.Request) {
        const welcomeEmailTemplatePath = path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "views",
            "welcomeEmail.html"
        );

        const welcomeEmailTemplate = await fs.readFile(welcomeEmailTemplatePath);
        const welcomeEmail = welcomeEmailTemplate
            .toString()
            .replaceAll("{name}", data.to.name)
            .replaceAll("{confirmAccountURL}", data.confirmAccountURL);

        await nodemailerTransport.sendMail(
            {
                from: `${data.from.name} <${data.from.email}>`,
                to: data.to.email,
                subject: "Welcome to Harpyo",
                html: welcomeEmail,
                text: removeHTMLTagsHelper(welcomeEmail)
            }
        );
    }
}