import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth';

interface ProjectSidebarMenuProps {
  projectId: string;
}

const ProjectSidebarMenu: React.FC<ProjectSidebarMenuProps> = ({ projectId }) => {
  const [projectName, setProjectName] = useState<string | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (loading || !currentUser || !projectId) {
      return;
    }

    setIsLoadingProject(true);
    import('@/api/endpoints/projects/projectApi').then(({ projectApi }) => {
      projectApi.getById(projectId)
        .then((project) => {
          setProjectName(project?.displayName || project?.fullName || null);
        })
        .catch((error) => {
          console.error('Failed to fetch project details:', error);
          setProjectName(null); // Fallback to no name
        })
        .finally(() => {
          setIsLoadingProject(false);
        });
    });
  }, [projectId, currentUser, loading]);

  const projectNav = [
    { label: 'Overview', href: `/projects/${projectId}` },
    { label: 'Locations', href: `/projects/${projectId}/locations` },
    { label: 'Tasks', href: `/projects/${projectId}/tasks` },
  ];

  return (
    <>
      <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid var(--border, #e2e8f0)' }} />
      {isLoadingProject ? (
        <div style={{ fontWeight: 600, margin: '0 0 8px 0', paddingLeft: 8, fontSize: 15, color: 'var(--gray-500, #64748b)' }}>
          Loading...
        </div>
      ) : projectName ? (
        <div style={{ fontWeight: 600, margin: '0 0 8px 0', paddingLeft: 8, fontSize: 15, color: 'var(--primary-700, #4338ca)' }}>
          {projectName}
        </div>
      ) : null}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projectNav.map((item, idx) => (
          <li key={idx}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectSidebarMenu;
