import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { createContactController, deleteContactController, listAllContactsController, updateContactController } from "../controllers/contacts.controllers";
import { validateData } from "../middlewares/validateData.middleware";
import { contactSchemaRequest, updateContactSchemaRequest } from "../schemas/contacts.schemas";
import { ensureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";

export const contactsRoutes: Router = Router()

contactsRoutes.post("", ensureAuthMiddleware, validateData(contactSchemaRequest), createContactController)
contactsRoutes.get("", ensureAuthMiddleware, listAllContactsController)
contactsRoutes.patch("/:id", ensureAuthMiddleware, ensureIsOwnerMiddleware, validateData(updateContactSchemaRequest), updateContactController)
contactsRoutes.delete("/:id", ensureAuthMiddleware, ensureIsOwnerMiddleware, deleteContactController)