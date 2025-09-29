'use client';

import React from 'react';
import styles from '../page.module.css';
import { useParams } from 'next/dist/client/components/navigation';
import { ProjectTasks } from '@/components/projects/project-tasks/ProjectTasks';
import { BackButton } from '@/components/projects/shared/back-button/back-button';

export default function Tasks() {
  const { id } = useParams();

  return (
    <section>
      <div className={styles.project__main}>
        <BackButton />
        <ProjectTasks id={Number(id)} />
      </div>
    </section>
  );
}
