import { SentMessageInfo } from "nodemailer/lib/ses-transport";

export enum EmailSendEventType {
  resetPassword = "resetPassword",
}

export interface EmailSendEvent {
  mailType: EmailSendEventType;
  email: string;
  name: string;
  link: string;
  subject: string;
  message: string;
}

export type EmailSend = (
  email: string,
  name: string,
  link: string,
  subject: string,
  message: string,
) => {
  [key in EmailSendEventType]: () => Promise<SentMessageInfo>;
};
