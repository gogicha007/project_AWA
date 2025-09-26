import React from 'react';
import styles from '../page.module.css';
import { ProjectLocations } from '@/components/projects/project-locations/ProjectLocations';

export default function Locations() {
  return (
    <section>
      <div className={styles.project__main}>
        <ProjectLocations />
      </div>
    </section>
  );
}
