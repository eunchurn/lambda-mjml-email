import { EmailSend } from "./types";
import { resetPasswordHtmlRender } from "libs/templates";
import { SendEmail } from "libs/transporter";
export * from "./types";

/**
 * It takes in an email, name, link, subject, and message, and returns an object with two functions:
 * resetPassword and shareProject
 * @param email - The email address of the recipient
 * @param name - The name of the person you're sending the email to.
 * @param link - The link to the project
 * @param subject - The subject of the email
 * @param message - The message that you want to send to the user.
 * @returns An object with two functions.
 */
export const sendEmail: EmailSend = (email, name, link, subject, message) => ({
  async resetPassword() {
    const html = await resetPasswordHtmlRender(link, message);
    return SendEmail(email, name, subject, html);
  },
});
