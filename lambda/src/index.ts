import { SendEmail } from "libs/transporter";
import { SentMessageInfo } from "nodemailer/lib/ses-transport";
import { resetPasswordHtmlRender } from "libs/templates";
import { EmailSendEvent, EmailSend } from "libs/sendEmail";

const sendEmail: EmailSend = (email, name, link, subject, message) => ({
  async resetPassword() {
    const html = await resetPasswordHtmlRender(link, message);
    return SendEmail(email, name, subject, html);
  },
});

export const handler = async (
  event: EmailSendEvent,
): Promise<SentMessageInfo> => {
  const { mailType, email, name, link, subject, message } = event;
  const result = await sendEmail(email, name, link, subject, message)[
    mailType
  ]();
  return result;
};
