import { bootstrap } from "./app"

bootstrap()
  .then(() => console.log("Server is running! 🚀"))
  .catch((error) => console.log(`${error} 🔥`))
