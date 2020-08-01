import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository"
import { ICreateUserRequestDTO } from "./ICreateUserRequestDTO"
import { User } from "../../entities/User"
import { IMailProvider } from "../../providers/interfaces/IMailProvider"

// Single Responsbility principle
// CreateUserService has only 1 unique responsibility, wich is Create a User.
// Less than 30 lines of code. Clean. Simple. Effective.

export class CreateUserService {
  // Dependency Inversion
  // Decoupling our Repository we don't leave it Stuck in our Create User Service.
  // So it is a free module that we can use in all our software.
  private usersRepository: IUsersRepository

  private mailProvider: IMailProvider

  // Here in the constructor, we add a User Repository that can be easily switched if needed.
  // Instead of attaching a fixed Repository.
  constructor(usersRepository: IUsersRepository, mailProvider: IMailProvider) {
    this.usersRepository = usersRepository
    this.mailProvider = mailProvider
  }

  async execute(data: ICreateUserRequestDTO) {
    //  Liskov Substitution
    //  Our code must run the same way, even if the repository has changed.
    //  As long it is implements the UsersRepository Interface, its ok.
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error("User already exists.")
    }

    const newUser = new User(data)

    // We don't need to directly save the user.
    // Our User Repository will take that job ;)
    await this.usersRepository.save(newUser)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Me",
        email: "me@app.com",
      },
      subject: "Welcome to my App",
      body: "<p> Hello from my APp ;) </p>",
    })
  }
}
