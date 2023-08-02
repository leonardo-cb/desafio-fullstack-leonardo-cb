import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { usersRoutes } from "./routers/users.routes"
import { handleErrors } from "./errors"
import { loginRoutes } from "./routers/login.routes"
import { contactsRoutes } from "./routers/contacts.routes"
import cors from "cors"

const app = express()
app.use(express.json())

app.use(cors({
    origin: "http://127.0.0.1:5173"
}))

app.use("/users", usersRoutes)
app.use("/login", loginRoutes)
app.use("/contacts", contactsRoutes)

app.use(handleErrors)

export default app