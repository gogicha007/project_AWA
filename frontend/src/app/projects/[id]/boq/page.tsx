'use client';

import { BoqSections } from '@/features/projects/project-boq/BoqSections';
import { useParams } from 'next/navigation';

export default function BoqPage() {

  return (
    <section>
      <BoqSections />
    </section>
  );
}
