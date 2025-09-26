import React from 'react';
import styles from '../page.module.css';
import { ProjectTasks } from '@/components/projects/project-tasks/ProjectTasks';

export default function Tasks() {
  return (
    <section>
      <div className={styles.project__main}>
        <ProjectTasks />
      </div>
    </section>
  );
}
