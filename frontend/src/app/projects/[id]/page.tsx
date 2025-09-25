'use client';

import React from 'react';
import styles from './page.module.css';
import { useParams, useRouter } from 'next/navigation';
import {HiChevronLeft} from 'react-icons/hi2';

const ProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  return (
    <section>
      <div className={styles.project__details}>
        <button
          className={styles.backButton}
          onClick={() => router.push('/projects')}
        >
          <HiChevronLeft className={styles.backButtonIcon} />
          Projects list
        </button>
        <h1>Project Details for {id}</h1>
      </div>
    </section>
  );
};

export default ProjectPage;
