import { createTransport } from "nodemailer";
import * as aws from "@aws-sdk/client-ses";

const ses = new aws.SES({ apiVersion: "2010-12-01", region: "ap-northeast-2" });

export const transporter = createTransport({
  SES: { ses, aws },
});

/**
 * It sends an email to the user with the given email, name, subject, and html
 * @param {string} email - The email address of the user
 * @param {string} name - The name of the user
 * @param {string} subject - The subject of the email
 * @param {string} html - The HTML content of the email.
 */
export const SendEmail = (
  email: string,
  name: string,
  subject: string,
  html: string,
) =>
  transporter.sendMail({
    from: `"My Service" no-reply@myservice.com`,
    to: `"${name}" ${email}`,
    subject,
    html,
  });
