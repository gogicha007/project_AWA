/*@params onSucceccCallback*/
/*@return createSection, updateSection, snackbarControll, setSnackbarControl **/

import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoqSectionDTO, sectionsApi } from "../../api/boqSectionsApi";



export const useSectionMutations = (
    onSuccessCreate?: (savedSection: BoqSectionDTO) => void,
    onSuccessUpdate?: (updatedSection: BoqSectionDTO) => void
) => {
    const { dbUserId } = useAuth()
    const [snackbarControl, setSnackbarControl] = useState({ isOpen: false, status: { message: '', success: false } })
    const queryClient = useQueryClient()

    const { mutate: createSection, isPending: isCreating, isSuccess: isSuccessCreateSection } = useMutation({
        mutationKey: ['createProjectSection'],
        mutationFn: (data: Partial<BoqSectionDTO>) => sectionsApi.creactBoqSection(data, Number(dbUserId)),
        onSuccess: (savedSection) => {
            queryClient.invalidateQueries({ queryKey: ['projectSectionsByProjectid'] })
            setSnackbarControl({ isOpen: true, status: { message: 'Seciton created successfully', success: true } });
            onSuccessCreate?.(savedSection)
        },
        onError: () => {
            setSnackbarControl({
                isOpen: true, status: { message: 'Failed to create location', success: false }
            })
        }
    })

    const { mutate: updateSection, isPending: isUpdating, isSuccess: isSuccessUpdateSection } = useMutation({
        mutationKey: ['updateProjectSection'],
        mutationFn: (data: BoqSectionDTO) => sectionsApi.updateBoqSection(data, Number(dbUserId)),
        onSuccess: (updatedSection) => {
            queryClient.invalidateQueries({ queryKey: ['projectSectionsByProjectid'] })
            setSnackbarControl({ isOpen: true, status: { message: 'Section updated successfully', success: true } })
            onSuccessUpdate?.(updatedSection)
        },
        onError: () => {
            setSnackbarControl({ isOpen: true, status: { message: 'Failed to update section', success: false } })
        }
    })

    return { createSection, updateSection, isPending: isCreating || isUpdating, snackbarControl, isSuccessCreateSection, isSuccessUpdateSection, setSnackbarControl }
}