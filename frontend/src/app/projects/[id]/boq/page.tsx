'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { BoqSections } from '@/components/projects/project-boq/BoqSections';

export default function Boq() {
  const { id } = useParams();

  return (
    <section>
      <BoqSections projectId={Number(id)} />
    </section>
  );
}
