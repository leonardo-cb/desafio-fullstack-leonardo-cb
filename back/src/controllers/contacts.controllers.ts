import { Request, Response } from "express";
import { createContactService } from "../services/contacts/createContact.service";
import { listAllContactsService } from "../services/contacts/listAllContacts.service";
import { deleteContactService } from "../services/contacts/deleteContact.service";
import { updateContactService } from "../services/contacts/updateContact.service";

export const createContactController = async (req: Request, res: Response): Promise<Response> => {

    const contact = req.body
    const userId = res.locals.userId

    const newUser = await createContactService(contact, userId)

    return res.status(201).json(newUser)
}

export const listAllContactsController = async (req: Request, res: Response): Promise<Response> => {

    const userId = res.locals.userId

    const contactList = await listAllContactsService(userId)

    return res.status(200).json(contactList)
}

export const updateContactController = async (req: Request, res: Response): Promise<Response> => {

    const contactData = req.body

    const contactId = +req.params.id

    const updatedContact = await updateContactService(contactData, contactId)

    return res.status(200).json(updatedContact)
}

export const deleteContactController = async (req: Request, res: Response): Promise<Response> => {

    const contactId = +req.params.id

    await deleteContactService(contactId)

    return res.status(204).send()
}