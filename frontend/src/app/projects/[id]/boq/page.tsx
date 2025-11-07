'use client';

import { useParams } from 'next/navigation';
import { BoqSections } from '@/features/projects/project-boq/BoqSections';

export default function Boq() {
  const { id } = useParams();

  return (
    <section>
      <BoqSections projectId={Number(id)} />
    </section>
  );
}
