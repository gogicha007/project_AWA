'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCard, ProjectCardSkeleton, ProjectsEmptyState, type Project } from '@/components/ui/project-card';
import styles from './page.module.css';
import { projectApi } from '@/api/endpoints/projects/projectApi';
import { ProjectDTO } from '@/api/types';

// Mock data - replace with your API call
// const mockProjects: Project[] = [
//   {
//     id: '1',
//     name: 'Logistics Management System',
//     description: 'A comprehensive system for managing shipments, vendors, and logistics operations with real-time tracking capabilities.',
//     status: 'inProgress',
//     createdAt: '2024-01-15',
//     updatedAt: '2024-08-15',
//     owner: 'John Doe',
//     clientName: 'AWA Corp',
//     dueDate: '2024-12-31'
//   },
//   {
//     id: '2',
//     name: 'Inventory Management',
//     description: 'Advanced inventory tracking with automated reorder points and supplier integration.',
//     status: 'active',
//     createdAt: '2024-02-01',
//     updatedAt: '2024-08-10',
//     owner: 'Jane Smith',
//     clientName: 'TechCorp'
//   },
//   {
//     id: '3',
//     name: 'Customer Portal',
//     description: 'Self-service portal for customers to track orders, submit requests, and manage their accounts.',
//     status: 'completed',
//     createdAt: '2023-11-20',
//     updatedAt: '2024-03-15',
//     owner: 'Mike Johnson',
//     clientName: 'RetailPlus'
//   },
//   {
//     id: '4',
//     name: 'Mobile App Development',
//     description: 'Native mobile applications for iOS and Android platforms with offline capabilities.',
//     status: 'onHold',
//     createdAt: '2024-03-10',
//     updatedAt: '2024-07-20',
//     owner: 'Sarah Wilson',
//     dueDate: '2025-06-30'
//   }
// ];

export default function Projects() {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await projectApi.getAll();
        setProjects(data);
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

  const handleEdit = (project: Project) => {
    console.log('Edit project:', project);
    // Open edit modal or navigate to edit page
  };

  const handleDelete = (projectId: string) => {
    console.log('Delete project:', projectId);
    // Remove project from state and call API
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleCreateNew = () => {
    console.log('Create new project');
    // Navigate to create project page or open modal
  };

  return (
    <div className={styles.projectsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Projects</h1>
          <p className={styles.pageDescription}>
            Manage and track your projects, monitor progress, and collaborate with your team.
          </p>
        </div>
        <button 
          className={`button primary ${styles.createButton}`}
          onClick={handleCreateNew}
        >
          Create New Project
        </button>
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
            <button 
              className="button primary"
              onClick={handleCreateNew}
            >
              Create Your First Project
            </button>
          }
        />
      ) : (
        <div className={styles.cardsGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
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
