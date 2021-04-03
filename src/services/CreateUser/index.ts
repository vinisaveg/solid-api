import { MailtrapMailProvider } from "../../providers/MailtrapMailProvider"
import { CreateUserController } from "./CreateUserController"
import { CreateUserService } from "./CreateUserService"

const mailtrapMailProvider = new MailtrapMailProvider()

const createUserService = new CreateUserService(mailtrapMailProvider)

const createUserController = new CreateUserController(createUserService)

export { createUserController }
