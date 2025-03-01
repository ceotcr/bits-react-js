import { z } from 'zod';

export const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string(),
    name: z.object({
        firstname: z.string(),
        lastname: z.string()
    }),
    phone: z.string(),
    address: z.object({
        geolocation: z.object({
            lat: z.string(),
            long: z.string()
        }),
        city: z.string(),
        street: z.string(),
        number: z.number(),
        zipcode: z.string()
    })
})

export type User = z.infer<typeof userSchema>