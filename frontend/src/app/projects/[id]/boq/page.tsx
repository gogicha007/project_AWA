'use client';

import { BoqSections } from '@/features/projects/project-boq/BoqSections';
import { useParams } from 'next/navigation';

export default function BoqPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <section>
      <BoqSections projectId={Number(id)} />
    </section>
  );
}
