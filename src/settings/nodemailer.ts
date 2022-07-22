import nodemailer from "nodemailer";

import {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS
} from "@/settings";

const isSMTPUserCredentialValid =
    SMTP_USER &&
    typeof SMTP_USER === "string" &&
    SMTP_USER !== "null" &&
    SMTP_USER !== "undefined";

const isSMTPPassCredentialValid =
    SMTP_PASS &&
    typeof SMTP_PASS === "string" &&
    SMTP_PASS !== "null" &&
    SMTP_PASS !== "undefined";

const auth = isSMTPUserCredentialValid && isSMTPPassCredentialValid
    ? {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
    : undefined;

export const nodemailerTransport = nodemailer.createTransport(
    {
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth
    }
);