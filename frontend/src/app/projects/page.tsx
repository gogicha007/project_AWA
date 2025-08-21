import styles from './page.module.css';
import React from 'react';
import ProjectsClient from '@/components/projects/ProjectsClient';

export default function Projects() {
  return (
    <section>
      <div className={styles.projects__main}>
        <ProjectsClient />
      </div>
    </section>
  )
}