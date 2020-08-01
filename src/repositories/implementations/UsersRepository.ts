import { IUsersRepository } from "../interfaces/IUsersRepository"
import { User } from "../../entities/User"

export class UsersRepository implements IUsersRepository {
  private users: Array<User> = []

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)

    return user
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}
