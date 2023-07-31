import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { userSchemaResponse } from "../../schemas/users.schemas";

export const listUserService = async (userId: number): Promise<any> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    const userResponse = userSchemaResponse.parse(user)

    return userResponse

}