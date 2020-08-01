import { IMessage } from "./IMessage"

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>
}
