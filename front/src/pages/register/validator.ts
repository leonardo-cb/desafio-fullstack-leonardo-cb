import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().max(60, "O nome deve ter no máximo 60 caracteres."),
    email: z.string().email("Insira um email valido."),
    password: z.string().nonempty("Insira sua senha."),
    telephone: z.string().max(13, "Digite apenas os números com código de país e estado.")
})

export type iRegister = z.infer<typeof registerSchema>