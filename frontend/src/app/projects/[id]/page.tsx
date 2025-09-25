'use client';

import React from 'react';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { BackButton } from '@/components/projects/shared/back-button/back-button';

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <section>
      <div className={styles.project__details}>
        <BackButton />
        <h1>Project Details for {id}</h1>
      </div>
    </section>
  );
};

export default ProjectPage;
