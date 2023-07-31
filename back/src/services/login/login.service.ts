import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { User } from "../../entities/users.entity";

export const loginService = async (loginData: any): Promise<string> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const userEmail: string = loginData.email

    const user: User | null = await userRepository.findOne({
        where: {
            email: userEmail
        }
    })

    if(!user){
        throw new AppError("Invalid credentials", 403)
    }

    const checkPassword = await compare(loginData.password, user.password)

    if(!checkPassword){
        throw new AppError("Invalid credentials", 403)
    }

    const token = jwt.sign(
        {
            fullName: user.fullName
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "1h",
            subject: String(user.id)
        }

    )

    return token
}