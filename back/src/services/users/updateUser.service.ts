import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { userSchemaResponse } from "../../schemas/users.schemas";

export const updateUserService = async (userData: any, userId: number): Promise<any> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUser: User | null = await userRepository.findOneBy({
        id: userId
    })

    const updateData = {
        fullName: userData.fullName !== "" ? userData.fullName : oldUser?.fullName,
        password: userData.password !== "" ? userData.password : oldUser?.password,
        telephone: userData.telephone !== "" ? userData.telephone : oldUser?.telephone
    };
    
    const newUser = userRepository.create({
        ...oldUser,
        ...updateData
    })

    await userRepository.save(newUser)

    const responseUser = userSchemaResponse.parse(newUser)

    return responseUser

}