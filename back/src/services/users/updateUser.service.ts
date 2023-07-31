import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { userSchemaResponse } from "../../schemas/users.schemas";

export const updateUserService = async (userData: any, userId: number): Promise<any> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUser: User | null = await userRepository.findOneBy({
        id: userId
    })

    const newUser = userRepository.create({
        ...oldUser,
        ...userData
    })

    await userRepository.save(newUser)

    const responseUser = userSchemaResponse.parse(newUser)

    return responseUser

}