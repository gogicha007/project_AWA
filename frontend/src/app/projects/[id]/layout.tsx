'use client';

import { ProjectContextProvider } from '@/features/projects/context/ProjectContext';
import { projectApi } from '@/features/projects/api/projectsListApi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProjectDTO } from '@/features/projects/projects-list/projectsCRUD/projectSchema';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const id = params.id as string;
        
        if (!id) {
          setError('No project ID provided');
          setLoading(false);
          return;
        }

        console.log('Fetching project with ID:', id);
        const data = await projectApi.getById(+id);
        console.log('Project data received:', data);
        
        if (!data) {
          setError('Project not found');
        } else {
          setProject(data);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    } else {
      setLoading(false);
      setError('No project ID in URL');
    }
  }, [params.id]);

  return (
    <ProjectContextProvider value={project}>{children}</ProjectContextProvider>
  );
}
