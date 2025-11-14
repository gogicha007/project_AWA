'use client';
import { createContext, useContext } from 'react';
import { ProjectDTO } from '../projects-list/projectsCRUD/projectSchema';

const ProjectContext = createContext<ProjectDTO | null>(null);

export function ProjectContextProvider({
  value,
  children,
}: {
  value: ProjectDTO | null;
  children: React.ReactNode;
}) {
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error('useProject must be used within ProjectContextProvider');
  return ctx;
}
