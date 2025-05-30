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
  const subPath = '/settings/master-data';
  const tM = useTranslations('MasterData');
  const pathname = usePathname();
  return (
    <section>
      <nav className={styles['settings__nav']}>
        <Link
          href={`${subPath}/material-groups`}
          className={`button ${pathname === `${subPath}/material-groups` ? styles.activeLink : ''}`}
        >
          {tM('material_groups.title')}
        </Link>
        <Link
          href={`${subPath}/material-types`}
          className={`button ${pathname === `${subPath}/material-types` ? styles.activeLink : ''}`}
        >
          {tM('material_types.title')}
        </Link>
        <Link
          href={`${subPath}/material-names`}
          className={`button ${pathname === `${subPath}/material-names` ? styles.activeLink : ''}`}
        >
          {tM('material_names.title')}
        </Link>
        <Link
          href={`${subPath}/units`}
          className={`button ${pathname === `${subPath}/units` ? styles.activeLink : ''}`}
        >
          {tM('units.title')}
        </Link>
      </nav>
      <div className={styles.settings__main}>{children}</div>
    </section>
  );
}
