'use client';

import styles from './projects.module.css';
import React, { useState, useEffect } from 'react';
import {
  ProjectCard,
  ProjectCardSkeleton,
  ProjectsEmptyState,
} from '@/components/projects/project-card';
import { useTranslations } from 'next-intl';
import AddButton from '@/components/controls/add-button/AddButton';
import { useProjectApi } from '@/api/hooks/projects/projectApiHook';
import { useProjectsLogic } from './useProjectsLogic';
import Loader from '../feedback/loader/loader';
import Snackbar from '../feedback/snackbar/snackbar';
import ProjectForm from './projectsCRUD/ProjectForm';

export default function ProjectsClient() {
  const tPj = useTranslations('Projects');
  const tCmn = useTranslations('Common');
  const { projects, loading, error, mutate } = useProjectApi();
  const [navigating, setNavigating] = useState(false);
  const {
    currentProject,
    errorMessage,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleView,
    isDialogOpen,
    setIsDialogOpen,
  } = useProjectsLogic(projects, mutate, tPj, setNavigating);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<{
    message: string;
    success: boolean;
  }>({ message: '', success: false });

  useEffect(() => {
    if (errorMessage) {
      setSnackbarStatus({
        message: error instanceof Error ? errorMessage : 'An error occurred',
        success: false,
      });
      setSnackbarOpen(true);
    }
  }, [errorMessage, error]);

  if (loading || navigating) return <Loader />;

  if (error)
    return (
      <div>
        `${tPj('errors.loading')} : {String(error)}`
      </div>
    );

  return (
    <div className={styles.projectsPage}>
      {loading ? (
        <div className={styles.cardsGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <ProjectsEmptyState
          actionButton={
            <button className="button primary" onClick={handleAdd}>
              {tPj('actions.create')}
            </button>
          }
        />
      ) : (
        <>
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>{tPj('title')}</h1>
            </div>
            <AddButton label={tPj('actions.create')} onAdd={handleAdd} />
          </div>
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
        </>
      )}
      <Snackbar
        status={snackbarStatus}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      <ProjectForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={currentProject}
        title={
          currentProject ? tPj('form.edit_title') : tPj('form.create_title')
        }
      />
    </div>
  );
}
