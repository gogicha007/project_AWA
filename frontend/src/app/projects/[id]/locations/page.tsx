'use client';

import React from 'react';
import styles from '../page.module.css';
import { useParams } from 'next/navigation';
import { ProjectLocations } from '@/components/projects/project-locations/ProjectLocationsClient';
import { BackButton } from '@/components/projects/shared/back-button/back-button';

export default function Locations() {
  const { id } = useParams();

  return (
    <section>
      <div className={styles.project__main}>
        <BackButton />
        <ProjectLocations id={Number(id)} />
      </div>
    </section>
  );
}
