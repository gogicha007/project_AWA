'use client';

import styles from './projects.module.css';
import React, { useState, useEffect } from 'react';
import {
  ProjectCard,
  ProjectCardSkeleton,
  ProjectsEmptyState,
} from '@/components/projects/project-card';
import { useTranslations } from 'next-intl';
import { projectApi } from '@/api/endpoints/projects/projectApi';
import { ProjectDTO } from '@/api/types';
import AddButton from '@/components/controls/add-button/AddButton';

export default function ProjectsClient() {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const tPj = useTranslations('Projects');
  const tCmn = useTranslations('Common');

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await projectApi.getAll();
        setProjects(data);
        console.log('Projects loaded:', data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleView = (projectId: string) => {
    console.log('View project:', projectId);
    // Navigate to project details page
    // router.push(`/projects/${projectId}`);
  };

  const handleEdit = (project: ProjectDTO) => {
    console.log('Edit project:', project);
    // Open edit modal or navigate to edit page
  };

  const handleDelete = (projectId: string) => {
    console.log('Delete project:', projectId);
    // Remove project from state and call API
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const handleCreateNew = () => {
    console.log('Create new project');
    // Navigate to create project page or open modal
  };

  return (
    <div className={styles.projectsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{tPj('title')}</h1>
          <p className={styles.pageDescription}>{tPj('description')}</p>
        </div>
        <AddButton label={tPj('actions.create')} onAdd={handleCreateNew} />
      </div>

      {loading ? (
        <div className={styles.cardsGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <ProjectsEmptyState
          actionButton={
            <button className="button primary" onClick={handleCreateNew}>
              {tPj('actions.create')}
            </button>
          }
        />
      ) : (
        <div className={styles.cardsGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tPj={tPj}
              tCmn={tCmn}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
