import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProjectSidebarMenuProps {
  projectId: string;
}

const ProjectSidebarMenu: React.FC<ProjectSidebarMenuProps> = ({ projectId }) => {
  const [projectName, setProjectName] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      import('@/api/endpoints/projects/projectApi').then(({ projectApi }) => {
        projectApi.getById(projectId).then((project) => {
          setProjectName(project?.displayName || project?.fullName || null);
        });
      });
    } else {
      setProjectName(null);
    }
  }, [projectId]);

  const projectNav = [
    { label: 'Overview', href: `/projects/${projectId}` },
    { label: 'Locations', href: `/projects/${projectId}/locations` },
    { label: 'Tasks', href: `/projects/${projectId}/tasks` },
  ];

  return (
    <>
      <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid var(--border, #e2e8f0)' }} />
      {projectName && (
        <div style={{ fontWeight: 600, margin: '0 0 8px 0', paddingLeft: 8, fontSize: 15, color: 'var(--primary-700, #4338ca)' }}>
          {projectName}
        </div>
      )}
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
