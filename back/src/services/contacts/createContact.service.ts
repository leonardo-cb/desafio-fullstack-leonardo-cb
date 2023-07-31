import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { userSchemaResponse } from "../../schemas/users.schemas";
import { hash } from "bcryptjs";
import { AppError } from "../../errors";
import { Contact } from "../../entities/contacts.entity";
import { contactSchema, contactSchemaResponse } from "../../schemas/contacts.schemas";

export const createContactService = async (contactData: any, userId: number): Promise<any> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    if(!user){
        throw new AppError("User not found!", 404)
    }

    const checkContact = await contactRepository.findOne({
        where: {
            telephone: contactData.telephone,
            user: user
        }
    })

    if(checkContact){
        throw new AppError("Contact already exists", 403)
    }

    const contact = contactRepository.create({
        ...contactData,
        user
    })

    await contactRepository.save(contact)

    const newContact = contactSchema.parse(contact)

    return newContact
}