'use client';

import { ProjectDTO } from '@/api/types';
import { useAuth } from '@/context/auth';
import { useCallback, useMemo, useState } from 'react';
import { projectApi } from '@/api/endpoints/projects/projectApi';
import { useRouter } from 'next/navigation';

export function useProjectsLogic(
  projects: ProjectDTO[],
  mutate: () => Promise<void | ProjectDTO[]>,
  tVar: (key: string) => string,
  setNavigating: (loading: boolean) => void
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectDTO | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const { dbUserId } = useAuth();
  const router = useRouter();
  const data: ProjectDTO[] = useMemo(() => projects, [projects]);

  const handleAdd = useCallback(() => {
    setCurrentProject(undefined);
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm(tVar('warnings.delete'))) {
        try {
          await projectApi.delete(+id);
          setErrorMessage(undefined);
        } catch (error) {
          setErrorMessage(
            typeof error === 'string'
              ? `${tVar('errors.delete')} ${id}. ${error}`
              : `${tVar('errors.delete')} ${id}`
          );
          console.error(`${tVar('errors.delete')} ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate, tVar]
  );

  const handleEdit = useCallback(
    (id: number) => {
      const project = projects.find((p) => p.id === id);
      setCurrentProject(project);
      setIsDialogOpen(true);
    },
    [projects]
  );

  const handleSave = useCallback(
    async (project: ProjectDTO) => {
      console.log('Project saved', project);
      try {
        if (project.id) {
          if (dbUserId === null) {
            throw new Error('User ID is required to update a project.');
          }
          await projectApi.update(project, dbUserId);
          setCurrentProject(project);
        } else {
          if (dbUserId === null) {
            throw new Error('User ID is required to create a project.');
          }
          await projectApi.create(project);
        }
        await mutate();
        setCurrentProject(undefined);
        setIsDialogOpen(false);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(
          typeof error === 'string'
            ? `${tVar('errors.save')} ${project.id}. ${error}`
            : `${tVar('errors.save')} ${project.id}`
        );
        console.error(`${tVar('errors.save')} ${project.id}`, error);
      }
    },
    [mutate, tVar, dbUserId]
  );

  const handleView = useCallback(
    (id: number) => {
      setNavigating(true);
      router.push(`/projects/${id}`);
    },
    [router, setNavigating]
  );

  return {
    currentProject,
    data,
    errorMessage,
    handleAdd,
    handleDelete,
    handleEdit,
    handleSave,
    handleView,
    isDialogOpen,
    setIsDialogOpen,
  };
}
