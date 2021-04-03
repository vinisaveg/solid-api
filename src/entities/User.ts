import { Column, Entity, PrimaryColumn } from "typeorm"
import { uuid } from "uuidv4"

@Entity("users")
export class User {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    }
  }
}
