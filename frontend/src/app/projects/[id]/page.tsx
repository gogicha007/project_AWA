'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <section>
      <h1>Project Details for {id}</h1>
    </section>
  );
};

export default ProjectPage;
