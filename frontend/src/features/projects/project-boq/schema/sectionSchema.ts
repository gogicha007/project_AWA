import { z } from 'zod'

const SectionSchema = z.object({
    id: z.number(),
    projectId: z.number().optional(),
    sectionCode: z.string(),
    sectionName: z.string(),
    sectionType: z.string().optional(),
    totalAmount: z.number().min(0.01, 'Quantity must be greater than 0'),
    locationId: z.number().nullable().optional(),
})

export { SectionSchema }