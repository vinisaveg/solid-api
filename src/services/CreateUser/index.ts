import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider"
import { UsersRepository } from "../../repositories/implementations/UsersRepository"
import { CreateUserService } from "./CreateUserService"
import { CreateUserController } from "./CreateUserController"

const mailtrapMailProvider = new MailtrapMailProvider()

const usersRepository = new UsersRepository()

const createUserService = new CreateUserService(usersRepository, mailtrapMailProvider)

const createUserController = new CreateUserController(createUserService)

export { createUserService, createUserController }
