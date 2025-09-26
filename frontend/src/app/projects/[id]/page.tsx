'use client';

import React from 'react';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { BackButton } from '@/components/projects/shared/back-button/back-button';
import { ProjectDetails } from '@/components/projects/project-details/ProjectDetails';

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <section>
      <div className={styles.project__main}>
        <BackButton />
        <ProjectDetails id={Number(id)} />
      </div>
    </section>
  );
};

export default ProjectPage;
