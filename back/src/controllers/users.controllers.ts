import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listUserService } from "../services/users/listUser.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const user= req.body

    const newUser = await createUserService(user)

    return res.status(201).json(newUser)
}

export const listUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId = +req.params.id

    const usersList = await listUserService(userId)

    return res.status(200).json(usersList)
}

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {

    const userData = req.body

    const userId = +req.params.id

    const updatedUser = await updateUserService(userData, userId)

    return res.status(200).json(updatedUser)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = +req.params.id

    await deleteUserService(userId)

    return res.status(204).send()
}