import { getCustomRepository } from "typeorm"
import { User } from "../../entities/User"
import { IMailProvider } from "../../providers/IMailProvider"
import { UsersRepository } from "../../repositories/user/UsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"

export class CreateUserService {
  private mailProvider: IMailProvider

  constructor(mailProvider: IMailProvider) {
    this.mailProvider = mailProvider
  }

  async execute(data: ICreateUserRequestDTO) {
    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({
      email: data.email,
    })

    if (userAlreadyExists) {
      throw new Error("User already exists.")
    }

    const newUser = new User(data)

    await usersRepository.save(newUser)

    await this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        email: "email@test.com",
        name: "solid-api",
      },
      body: "<p>You have been registered! </p>",
      subject: "User created",
    })
  }
}
