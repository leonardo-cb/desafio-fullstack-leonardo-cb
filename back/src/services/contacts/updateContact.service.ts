import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contacts.entity"
import { contactSchema } from "../../schemas/contacts.schemas"
import { AppError } from "../../errors"

export const updateContactService = async (contactData: any, taskId: number): Promise<any> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const oldContact: Contact | null = await contactRepository.findOneBy({
        id: taskId
    })

    if(!oldContact){
        throw new AppError('Contact not found!', 404)
    }

    const newContact = contactRepository.create({
        ...oldContact,
        ...contactData
    })

    await contactRepository.save(newContact)

    const responseContact = contactSchema.parse(newContact)

    return responseContact

}