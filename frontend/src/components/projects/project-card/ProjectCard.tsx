'use client';

import React from 'react';
import { FiCalendar, FiUser, FiExternalLink, FiEdit, FiTrash2 } from 'react-icons/fi';

import { ProjectDTO, ProjectStatus } from '@/api/types';
import styles from './project-card.module.css';


interface ProjectCardProps {
  project: ProjectDTO;
  onEdit?: (project: ProjectDTO) => void;
  onDelete?: (projectId: string) => void;
  onView?: (projectId: string) => void;
  showActions?: boolean;
  className?: string;
}

const getStatusText = (status: ProjectStatus): string => {
  const statusMap = {
    active: 'Active',
    completed: 'Completed',
    inProgress: 'In Progress',
    onHold: 'On Hold'
  };
  return statusMap[status];
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  className
}) => {
  const handleView = () => {
    if (onView) {
      onView(project.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(project);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && confirm(`Are you sure you want to delete "${project.fullName}"?`)) {
      onDelete(project.id);
    }
  };

  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{project.fullName}</h3>
        <span className={`${styles.cardStatus} ${styles[project.status]}`}>
          {getStatusText(project.status)}
        </span>
      </div>

      {project.notes && (
        <p className={styles.cardDescription}>
          {project.notes}
        </p>
      )}

      <div className={styles.cardMeta}>
        <div className={styles.cardMetaItem}>
          <FiCalendar size={14} />
          <span>Created {formatDate(project.createdAt)}</span>
        </div>
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
            View Details
          </button>
          {onEdit && (
            <button
              className={`${styles.cardButton} ${styles.secondary}`}
              onClick={handleEdit}
            >
              <FiEdit size={14} />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className={`${styles.cardButton} ${styles.danger}`}
              onClick={handleDelete}
            >
              <FiTrash2 size={14} />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Loading skeleton component
export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className={styles.cardSkeleton}>
      <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
      <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
      <div className={`${styles.skeletonLine} ${styles.skeletonText} ${styles.short}`} />
      <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
    </div>
  );
};

// Empty state component
interface EmptyStateProps {
  title?: string;
  description?: string;
  actionButton?: React.ReactNode;
}

export const ProjectsEmptyState: React.FC<EmptyStateProps> = ({
  title = "No projects yet",
  description = "Create your first project to get started with managing your work.",
  actionButton
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
