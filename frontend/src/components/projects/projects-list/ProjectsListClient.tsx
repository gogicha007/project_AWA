'use client';

import styles from './projects.module.css';
import { useState, useMemo } from 'react';
import {
  ProjectCard,
  ProjectCardSkeleton,
  ProjectsEmptyState,
} from '@/components/projects/projects-list/project-card';
import { useTranslations } from 'next-intl';
import AddButton from '@/components/controls/add-button/AddButton';
import { useProjectsListApi } from '@/api/hooks/projects/projectsListApiHook';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import { useProjectsLogic } from './useProjectsLogic';
import Loader from '../../feedback/loader/loader';
import Snackbar from '../../feedback/snackbar/snackbar';
import ProjectForm from './projectsCRUD/ProjectForm';

export default function ProjectsListClient() {
  const tPj = useTranslations('Projects');
  const tCmn = useTranslations('Common');
  const { projects, loading, error, mutate } = useProjectsListApi();
  const { currencies, loading: loadingCurrencies } = useCurrencyApiHook();
  const [navigating, setNavigating] = useState(false);
  const {
    clearError,
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

  const snackbarOpen = Boolean(errorMessage);
  const snackbarStatus = useMemo(() => ({
    message: errorMessage ?? '',
    success: false,
  }),[errorMessage]);

  if (loading || loadingCurrencies || navigating) return <Loader />;

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
        onClose={() => clearError()}
      />
      <ProjectForm
        currencies={currencies}
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
