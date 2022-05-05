import { IMailAdapter, ISendMailData } from "../IMailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "91bc2b19eceece",
    pass: "5e4bbcba2a7b89",
  },
});

export class MailAdapter implements IMailAdapter {
  async sendMail({ body, subject }: ISendMailData): Promise<void> {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "SDMasterGames <sdmastergames@hotmail.com>",
      subject,
      html: body,
    });
  }
}
