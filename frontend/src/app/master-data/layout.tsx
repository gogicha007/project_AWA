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
          {tM('menu.material_groups')}
        </Link>
        <Link href="/master-data/material-types" className="button">
          {tM('menu.material_types')}
        </Link>
        <Link href="/master-data/material-names" className="button">
          {tM('menu.material_names')}
        </Link>
        <Link href="/master-data/units" className="button">
          {tM('menu.units')}
        </Link>
      </nav>
      <div className={styles.settings__main}>{children}</div>
    </section>
  );
}
