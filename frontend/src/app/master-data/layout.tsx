import React from 'react';
import Link from 'next/link';

export default function MasterDataLayoutlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link href="/master-data/material-groups">Material Groups</Link>
          </li>
          <li>
            <Link href="/master-data/material-types">Material Types</Link>
          </li>
          <li>
            <Link href="/master-data/units">Units</Link>
          </li>
          <li>
            <Link href="/master-data/material-names">Material Names</Link>
          </li>
        </ul>
      </nav>
      {children}
    </section>
  );
}
