import { z } from "zod";

export const updateProfileSchema = z.object({
    fullName: z.string().max(60, "O nome deve ter no máximo 60 caracteres."),
    email: z.string().email("Insira um email valido."),
    password: z.string(),
    telephone: z.string().max(13, "Digite apenas os números com código de país e estado.")
})

export type iUpdateProfile = z.infer<typeof updateProfileSchema>

export const createContactSchema = z.object({
    fullName: z.string().max(60, "O nome deve ter no máximo 60 caracteres."),
    email: z.string().email("Insira um email valido.").max(45),
    telephone: z.string().max(13, "Digite apenas os números com código de país e estado.")
})

export type iCreateContact = z.infer<typeof createContactSchema>