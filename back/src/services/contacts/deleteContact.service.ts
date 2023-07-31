import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contacts.entity"
import { AppError } from "../../errors"

export const deleteContactService = async (contactId: number): Promise<any> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOne({
        where: {
            id: contactId
        }
    })

    if(!contact){
        throw new AppError('Contact not found.', 404)
    }

    await contactRepository.remove(contact)
}