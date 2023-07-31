import { Router } from "express";
import { createUserController, deleteUserController, listUserController, updateUserController } from "../controllers/users.controllers";

export const usersRoutes: Router = Router()

usersRoutes.post("", createUserController)
usersRoutes.get("/:id", listUserController)
usersRoutes.patch("/:id", updateUserController)
usersRoutes.delete("/:id", deleteUserController)