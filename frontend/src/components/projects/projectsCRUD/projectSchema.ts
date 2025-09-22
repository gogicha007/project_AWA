import { z } from 'zod';

const projectSchema = z.object({
    id: z.number().optional(),
    fullName: z.string().min(2).max(100),
    displayName: z.string().min(2).max(100),
    clientId: z.string().uuid().nullable(),
    managerId: z.string().uuid().nullable(),
    status: z.enum(['active', 'completed', 'onHold', 'inProgress']),
    notes: z.string().max(500).nullable(),
    startDate: z.date(),
    // currencyId: z.string().uuid(),
    // createdAt: z.date(),
    // updatedAt: z.date(),
    userId: z.string().uuid()
});

export type ProjectFormSchema = z.infer<typeof projectSchema>;

export default projectSchema;
