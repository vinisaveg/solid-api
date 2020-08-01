import { Router, Request, Response } from "express"
import { createUserController } from "../services/CreateUser"

const router = Router()

router.post("/users", (request: Request, response: Response) => {
  return createUserController.handle(request, response)
})

export { router }
