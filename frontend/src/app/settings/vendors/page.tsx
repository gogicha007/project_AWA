import styles from './page.module.css';
import React from 'react';
import VendorsClient from '@/components/settings/vendors/VendorsClient';

const Vendors = () => {
  return (
    <section>
      <div className={styles.vendors__main}>
        <VendorsClient />
      </div>
    </section>
  );
};

export default Vendors;
