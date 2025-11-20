/*@params onSucceccCallback*/
/*@return createLocation, updateLocation, snackbar, setSnackbar **/

import { useState } from "react";
import { useAuth } from "@/context/auth";
import { FormValues } from "../components/locations-crud/location-form";
import { useMutation } from "@tanstack/react-query";
import { locationsApi } from "../api/locationsApi";

export const useLocationMutations = (onSuccessCallback?: () => void) => {
    const { dbUserId } = useAuth();
    const [snackbar, setSnackbar] = useState({ isOpen: false, status: { message: '', success: false } });

    const { mutate: createLocation, isPending: isCreating } = useMutation({
        mutationKey: ['createProjectLocation'],
        mutationFn: (data: FormValues) => locationsApi.create(data, Number(dbUserId)),
        onSuccess: () => {
            setSnackbar({ isOpen: true, status: { message: 'Location created successfully', success: true } });
            onSuccessCallback?.()
        },
        onError: () => {
            setSnackbar({
                isOpen: true, status: { message: 'Failed to create location', success: false },
            });
        }
    });

    const { mutate: updateLocation, isPending: isUpdating } = useMutation({
        mutationKey: ['updateProjectLocation'],
        mutationFn: (data: FormValues) => locationsApi.update(data, Number(dbUserId)),
        onSuccess: () => {
            setSnackbar({
                isOpen: true,
                status: { message: 'Location updated successfully', success: true },
            });
            onSuccessCallback?.()
        },
        onError: () => {
            setSnackbar({
                isOpen: true,
                status: { message: 'Failed to update location', success: false },
            });
        },

    })
    return { createLocation, updateLocation, isPending: isCreating || isUpdating, snackbar, setSnackbar };
};