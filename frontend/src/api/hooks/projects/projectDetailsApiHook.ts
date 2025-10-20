import { useState, useEffect, useCallback } from "react";
import { projectApi } from "@/api/endpoints/projects/projectApi";
import { useAuth } from "@/context/auth";
import { ProjectDTO } from "@/api/types";

export function useProjectDetailsApi(projectId: number | null) {
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);
    const { currentUser, loading: authLoading } = useAuth();

    const fetchProject = useCallback(async () => {
        setLoading(true);
        setError(null);
        if (projectId === null) {
            setProject(null);
            return;
        }
        try {
            const data = await projectApi.getById(projectId as number);
            setProject(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const mutate = useCallback(() => {
        if (!authLoading) return fetchProject();
        return Promise.resolve();
    }, [authLoading, fetchProject]);

    useEffect(() => {
        if (authLoading) return;
        fetchProject();
    }, [authLoading, currentUser?.uid, fetchProject]);

    return { project, loading, error, mutate };
}