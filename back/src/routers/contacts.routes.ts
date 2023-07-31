import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { createContactController, listAllContactsController } from "../controllers/contacts.controllers";

export const contactsRoutes: Router = Router()

contactsRoutes.post("", ensureAuthMiddleware, createContactController)
contactsRoutes.get("", ensureAuthMiddleware, listAllContactsController)