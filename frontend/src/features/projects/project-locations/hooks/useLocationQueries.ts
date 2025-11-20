import { useQuery } from '@tanstack/react-query'
import { locationsApi } from "../api/locationsApi";

export const useLocationQueries = () => {
    const { isPending: isPendingLocations, isError: isErrorLocations, isSuccess: isSuccessLocations, data: locationsData, error: getAllLocationsError } = useQuery({
        queryKey: ['projectLocations'],
        queryFn: locationsApi.getAll,
    })
    return { locationsData, isPendingLocations, isErrorLocations, isSuccessLocations, getAllLocationsError }
}