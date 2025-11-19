import { z } from 'zod'

export const LocationSchema = z.object({
    id: z.number(),
    locationName: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    notes: z.string().optional()
})


export type LocationDTO = z.infer<typeof LocationSchema>