import styles from './page.module.css';
import ProjectsClient from '@/features/projects/projects-list/ProjectsListClient';

export default function Projects() {
  return (
    <section>
      <div className={styles.projects__main}>
        <ProjectsClient />
      </div>
    </section>
  )
}