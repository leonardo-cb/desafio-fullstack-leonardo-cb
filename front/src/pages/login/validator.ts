import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Insira um email valido."),
    password: z.string().nonempty("Insira sua senha.")
})

export type iLogin = z.infer<typeof loginSchema>