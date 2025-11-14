import { z } from 'zod';
import { PROJECT_STATUSES } from '@/constants/projectStatus';

const projectSchema = z.object({
    id: z.number().optional(),
    fullName: z.string().min(2).max(100),
    displayName: z.string().min(2).max(100),
    clientId: z.string().nullable().optional(),
    managerId: z.string().nullable().optional(),
    status: z.enum(PROJECT_STATUSES),
    notes: z.string().max(500).nullable(),
    startDate: z.date().nullable(),
    endDate: z.date(),
    currencyId: z.coerce.number(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    // userId: z.string().optional(),
}).refine((data) => (data.startDate as Date) < (data.endDate as Date), {
    message: 'Start date must be before end date',
    path: ['endDate'],
});

export type ProjectFormSchema = z.infer<typeof projectSchema>;
export type ProjectDTO = z.infer<typeof projectSchema>;

export default projectSchema;
