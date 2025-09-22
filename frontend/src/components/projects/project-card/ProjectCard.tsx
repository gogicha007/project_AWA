'use client';

import React from 'react';
import {
  FiCalendar,
  FiUser,
  FiExternalLink,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';

import { ProjectDTO, ProjectStatus } from '@/api/types';
import styles from './project-card.module.css';

interface ProjectCardProps {
  project: ProjectDTO;
  tPj: (key: string) => string;
  tCmn: (key: string) => string;
  onEdit?: (projectId: number) => void;
  onDelete?: (projectId: number) => void;
  onView?: (projectId: number) => void;
  showActions?: boolean;
  className?: string;
}

const getStatusText = (
  status: ProjectStatus,
  tPj: (key: string) => string
): string => {
  const statusMap = {
    active: tPj('status.active'),
    completed: tPj('status.completed'),
    inProgress: tPj('status.inProgress'),
    onHold: tPj('status.onHold'),
  };
  return statusMap[status];
};

const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  tPj,
  tCmn,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  className,
}) => {
  const handleView = () => {
    if (onView) {
      onView(project.id as number);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(project.id as number);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && confirm(`${tCmn('confirm_delete')}${project.fullName}"?`)) {
      onDelete(project.id as number);
    }
  };

  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{project.fullName}</h3>
        <span className={`${styles.cardStatus} ${styles[project.status]}`}>
          {getStatusText(project.status, tPj)}
        </span>
      </div>

      {project.notes && (
        <p className={styles.cardDescription}>{project.notes}</p>
      )}

      <div className={styles.cardMeta}>
        {project.managerId && (
          <div className={styles.cardMetaItem}>
            <FiUser size={14} />
            <span>{project.managerId}</span>
          </div>
        )}
        {project.startDate && (
          <div className={styles.cardMetaItem}>
            <FiCalendar size={14} />
            <span>Start Date {formatDate(project.startDate)}</span>
          </div>
        )}
      </div>

      {showActions && (
        <div className={styles.cardActions}>
          <button
            className={`${styles.cardButton} ${styles.primary}`}
            onClick={handleView}
          >
            <FiExternalLink size={14} />
            {tCmn('viewDetails')}
          </button>
          {onEdit && (
            <button
              className={`${styles.cardButton} ${styles.secondary}`}
              onClick={handleEdit}
            >
              <FiEdit size={14} />
              {tCmn('edit')}
            </button>
          )}
          {onDelete && (
            <button
              className={`${styles.cardButton} ${styles.danger}`}
              onClick={handleDelete}
            >
              <FiTrash2 size={14} />
              {tCmn('delete')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className={styles.cardSkeleton}>
      <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
      <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
      <div
        className={`${styles.skeletonLine} ${styles.skeletonText} ${styles.short}`}
      />
      <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionButton?: React.ReactNode;
}

export const ProjectsEmptyState: React.FC<EmptyStateProps> = ({
  title = 'No projects yet',
  description = 'Create your first project to get started with managing your work.',
  actionButton,
}) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>📋</div>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateDescription}>{description}</p>
      {actionButton}
    </div>
  );
};

export default ProjectCard;
