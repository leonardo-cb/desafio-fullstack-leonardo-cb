import { Request, Response } from "express";
import { loginService } from "../services/login/login.service";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    
    const loginData = req.body

    const token = await loginService(loginData)

    return res.json({ token })
}