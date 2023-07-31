import { Request, Response } from "express";
import { createContactService } from "../services/contacts/createContact.service";
import { listAllContactsService } from "../services/contacts/listAllContacts.service";
import { deleteContactService } from "../services/contacts/deleteContact.service";

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


    return res.status(200).json()
}

export const deleteContactController = async (req: Request, res: Response): Promise<Response> => {

    const contactId: number = +req.params.id

    await deleteContactService

    return res.status(204).send()
}