import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contacts.entity"
import { User } from "../../entities/users.entity"

export const listAllContactsService = async (userId: number): Promise<any> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.find({
        where: {
            id: userId
        }
    })

    const contactList = await contactRepository.find({
        where: {
            user: user
        }
    })

    return contactList
}