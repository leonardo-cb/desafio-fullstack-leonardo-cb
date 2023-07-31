import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contacts.entity"
import { AppError } from "../errors"

export const ensureIsOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const contactRepository = AppDataSource.getRepository(Contact)

    const contactId = +req.params.id
    const userId = res.locals.userId

    const contact = await contactRepository.findOne({
        where: {
            id: contactId
        },
        relations: {
            user: true
        }
    })

    if(!contact){
        throw new AppError('Contact not found!', 404)
    }

    if(contact.user.id !== userId){
        throw new AppError('Insufficient permission', 403)
    }

    return next()
}