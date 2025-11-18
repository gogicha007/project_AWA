import { z } from 'zod'

export const LocationSchema = z.object({
    id: z.number(),
    locationName: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    notes: z.string()
})


export type LocationDTO = z.infer<typeof LocationSchema>