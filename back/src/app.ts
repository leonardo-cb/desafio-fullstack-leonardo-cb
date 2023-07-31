import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { usersRoutes } from "./routers/users.routes"
import { handleErrors } from "./errors"
import { loginRoutes } from "./routers/login.routes"
import { contactsRoutes } from "./routers/contacts.routes"

const app = express()
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/login", loginRoutes)
app.use("/contacts", contactsRoutes)

app.use(handleErrors)

export default app