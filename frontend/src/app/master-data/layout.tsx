import styles from './page.module.css';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MasterDataLayoutlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tM = useTranslations('MasterData');
  return (
    <section>
      <nav className={styles['settings__nav']}>
        <Link href="/master-data/material-groups" className="button">
          {tM('material_groups.title')}
        </Link>
        <Link href="/master-data/material-types" className="button">
          {tM('material_types.title')}
        </Link>
        <Link href="/master-data/material-names" className="button">
          {tM('material_names.title')}
        </Link>
        <Link href="/master-data/units" className="button">
          {tM('units.title')}
        </Link>
      </nav>
      <div className={styles.settings__main}>{children}</div>
    </section>
  );
}
