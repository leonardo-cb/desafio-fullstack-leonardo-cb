import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    fullName: z.string().max(60),
    email: z.string().email().max(45),
    password: z.string().max(120),
    telephone: z.string().max(13),
    createdAt: z.string(),
})

export const userSchemaRequest = userSchema.omit({ id: true })

export const userSchemaResponse = userSchema.omit({ password: true })