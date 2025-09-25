import { ProjectFormSchema } from "../projectSchema";
import { ProjectDTO } from "@/api/types";
import { ensureDate, ensureInteger } from "@/utils/helper";
import { PROJECT_STATUSES } from "@/constants/projectStatus";
import { add } from "date-fns";

export const defaultProjectFormValues = (data?: ProjectDTO): ProjectFormSchema => ({
    id: data?.id || undefined,
    fullName: data?.fullName || '',
    displayName: data?.displayName || '',
    clientId: data?.clientId || null,
    managerId: data?.managerId || null,
    status: data?.status || 'active',
    notes: data?.notes || '',
    startDate: ensureDate(data?.startDate) || new Date(),
    endDate: ensureDate(data?.endDate) || add(new Date(), { years: 1 }),
    currencyId: data?.currencyId || 1,
    // userId: data?.userId || '' as ProjectFormSchema['userId']
});


export const statusOptions = (tVar: (key: string) => string) => {
    return (
        PROJECT_STATUSES.map((status) => ({
            value: status,
            label: tVar(`status.${status}`),
        }))
    );
}
export const currencyOptions = (currencies: { id: number; code: string }[]) => {
    return (
        currencies.map((currency) => ({
            value: currency.id.toString(),
            label: currency.code,
        }))
    );
}

export const transformProjectFormDataForSubmission = (data: ProjectFormSchema): Omit<ProjectDTO, 'createdAt' | 'updatedAt'> => {
    return {
        ...data,
        currencyId: ensureInteger(data.currencyId),
        // userId: data.userId
    }
};
