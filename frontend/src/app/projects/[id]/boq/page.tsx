'use client';

import React from 'react';
import styles from '../page.module.css';
import { useParams } from 'next/navigation';
import { BackButton } from '@/components/projects/shared/back-button/back-button';
import {ProjectBoq} from '@/components/projects/project-boq/ProjectBoq';


export default function Boq() {
  const { id } = useParams();

  return (
    <section>
      <div className={styles.project__main}>
        <BackButton />
        <ProjectBoq projectId={Number(id)} />
      </div>
    </section>
  );
}
