'use client';

import { ProjectDTO } from "@/api/types";
import { useAuth } from "@/context/auth";
import { useCallback, useEffect, useState } from "react";
import { projectApi } from "@/api/endpoints/projects/projectApi";

export function useProjectApi() {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown | null>(null);
    const { currentUser, loading: authLoading } = useAuth();

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await projectApi.getAll();
            setProjects(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const mutate = useCallback(() => {
        if (!authLoading) return fetchProjects();
        return Promise.resolve();
    }, [authLoading, fetchProjects]);

    useEffect(() => {
        if (authLoading) return;
        fetchProjects()
    }, [authLoading, currentUser?.uid, fetchProjects]);

    return { projects, loading, error, mutate };
}
