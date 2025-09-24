import { ProjectFormSchema } from "../projectSchema";
import { ProjectDTO } from "@/api/types";
import { ensureDate } from "@/utils/helper";

export const defaultProjectFormValues = (data?: ProjectDTO): ProjectFormSchema => ({
    fullName: data?.fullName || '',
    displayName: data?.displayName || '',
    clientId: data?.clientId || null,
    managerId: data?.managerId || null,
    status: data?.status || 'active',
    notes: data?.notes || '',
    startDate: ensureDate(data?.startDate) || new Date(),
    // currencyId: '',
    // userId: '' as ProjectFormSchema['userId']
});