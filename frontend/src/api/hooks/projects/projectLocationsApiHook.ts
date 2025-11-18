import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import { LocationDTO } from '@/features/projects/project-locations/schema/locationSchema';
import { locationsApi } from '@/features/projects/project-locations/api/locationsApi';


export function useProjectLocationsApi(projectId: number | null) {
    const [locations, setLocations] = useState<LocationDTO[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);
    const { currentUser, loading: authLoading } = useAuth();

    console.log(projectId)
    const fetchProjectLocations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedLocations = await locationsApi.getAll();
            setLocations(fetchedLocations);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const mutate = useCallback(() => {
        if (!authLoading) return fetchProjectLocations();
        return Promise.resolve();
    }, [authLoading, fetchProjectLocations]);

    useEffect(() => {
        if (authLoading) return;
        fetchProjectLocations();
    }, [authLoading, currentUser?.uid, fetchProjectLocations]);
    
    return {
        locations,
        loading,
        error,
        mutate
    };
}