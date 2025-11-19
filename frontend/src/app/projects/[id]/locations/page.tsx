'use client';

import styles from '../page.module.css';
import { useParams } from 'next/navigation';
import { ProjectLocations } from '@/features/projects/project-locations/components/ProjectLocationsClient';
import { BackButton } from '@/features/projects/shared/back-button/back-button';

export default function LocationsPage() {
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
