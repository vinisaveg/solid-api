import { IMailProvider } from "../interfaces/IMailProvider"
import { IMessage } from "../interfaces/IMessage"

import nodemailer from "nodemailer"

export class MailtrapMailProvider implements IMailProvider {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "host",
      port: 2525,
      auth: {
        user: "user",
        pass: "pass",
      },
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
}
