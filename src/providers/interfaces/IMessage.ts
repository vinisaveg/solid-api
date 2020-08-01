import { IAddress } from "./IAddress"

export interface IMessage {
  to: IAddress
  from: IAddress
  subject: string
  body: string
}
