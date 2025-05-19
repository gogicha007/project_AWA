'use client';

import styles from './page.module.css';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function MasterDataLayoutlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tM = useTranslations('MasterData');
  const pathname = usePathname();
  return (
    <section>
      <nav className={styles['settings__nav']}>
        <Link
          href="/master-data/material-groups"
          className={`button ${pathname === '/master-data/material-groups' ? styles.activeLink : ''}`}
        >
          {tM('material_groups.title')}
        </Link>
        <Link
          href="/master-data/material-types"
          className={`button ${pathname === '/master-data/material-types' ? styles.activeLink : ''}`}
        >
          {tM('material_types.title')}
        </Link>
        <Link
          href="/master-data/material-names"
          className={`button ${pathname === '/master-data/material-names' ? styles.activeLink : ''}`}
        >
          {tM('material_names.title')}
        </Link>
        <Link
          href="/master-data/units"
          className={`button ${pathname === '/master-data/units' ? styles.activeLink : ''}`}
        >
          {tM('units.title')}
        </Link>
      </nav>
      <div className={styles.settings__main}>{children}</div>
    </section>
  );
}
