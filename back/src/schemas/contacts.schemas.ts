import { z } from "zod";

export const contactSchema = z.object({
    id: z.number(),
    fullName: z.string().max(60),
    email: z.string().email().max(45),
    telephone: z.string().max(13),
    createdAt: z.string()
})

export const contactSchemaRequest = contactSchema.omit({ id: true, createdAt: true })

export const updateContactSchemaRequest = contactSchemaRequest.partial()