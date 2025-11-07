'use client';

import styles from './page.module.css';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import { BackButton } from '@/features/projects/shared/back-button/back-button';

export default function BoqLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const subPath = `/projects/${id}/boq`;
  const tB = useTranslations('ProjectBoq');
  const pathname = usePathname();
  return (
    <section>
      <div
        className="flex items-center justify-between border-b border-[#e2e8f0]"
        style={{ padding: '4px', paddingBottom: '8px', marginBottom: '2px' }}
      >
        <BackButton />
        <nav className="mb-4 flex gap-2 space-x-4">
          <Link
            href={`${subPath}`}
            className={`button ${pathname === `${subPath}` ? styles.activeLink : ''}`}
          >
            {tB('sections.title')}
          </Link>
          <Link
            href={`${subPath}/items`}
            className={`button ${pathname === `${subPath}/items` ? styles.activeLink : ''}`}
          >
            {tB('items')}
          </Link>
        </nav>
      </div>
      <div className={styles.boq__main}>{children}</div>
    </section>
  );
}
