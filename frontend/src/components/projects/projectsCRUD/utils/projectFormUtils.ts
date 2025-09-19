import { ProjectFormSchema } from "../projectSchema";

export const defaultProjectFormValues = (): ProjectFormSchema => ({
    fullName: '',
    displayName: '',
    clientId: null,
    managerId: null,
    status: '' as ProjectFormSchema['status'],
    notes: null,
    startDate: new Date(),
    //   currencyId: '',
    userId: '' as ProjectFormSchema['userId']
});