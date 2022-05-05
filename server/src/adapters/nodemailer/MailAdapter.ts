import { IMailAdapter, ISendMailData } from "../IMailAdapter";
import nodemailer from "nodemailer";

const host = process.env["SMTP_HOST"];
const port = process.env["SMTP_PORT"];
const user = process.env["SMTP_AUTH_USER"];
const pass = process.env["SMTP_AUTH_PASS"];

if (!host || !port || !user || !pass) {
  throw new Error("Está faltando informações para o SMTP");
}
const transport = nodemailer.createTransport({
  host,
  port: Number(port),
  auth: {
    user,
    pass,
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
