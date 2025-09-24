import { z } from 'zod';
import { PROJECT_STATUSES } from '@/constants/projectStatus';

const projectSchema = z.object({
    id: z.number().optional(),
    fullName: z.string().min(2).max(100),
    displayName: z.string().min(2).max(100),
    clientId: z.string().uuid().nullable().optional(),
    managerId: z.string().uuid().nullable().optional(),
    status: z.enum(PROJECT_STATUSES),
    notes: z.string().max(500).nullable(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    currencyId: z.number().min(1, 'Currency is required'),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    // userId: z.string().optional(),
});

export type ProjectFormSchema = z.infer<typeof projectSchema>;

export default projectSchema;
