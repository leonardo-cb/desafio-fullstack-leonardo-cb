import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { userSchemaResponse } from "../../schemas/users.schemas";
import { hash } from "bcryptjs";
import { AppError } from "../../errors";

export const createUserService = async (userData: any): Promise<any> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const { fullName, email, password, telephone } = userData

    const findUser = await userRepository.findOne({
        where: {
            email
        }
    })

    if (findUser) {
        throw new AppError("User already exists.", 409)
    }

    const hashedPassword = await hash(password, 10)
    const user = userRepository.create({
        fullName,
        email,
        password: hashedPassword,
        telephone
    })

    await userRepository.save(user)

    const newUser = userSchemaResponse.parse(user)

    return newUser
}