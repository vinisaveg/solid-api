import { app } from "./app"

const port: number = 3333

app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})
