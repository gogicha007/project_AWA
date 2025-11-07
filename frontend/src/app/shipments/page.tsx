import styles from './page.module.css';
import React from 'react';
import ShipmentsClient from '@/features/logistics/ShipmentsClient';

const Logistics = () => {
  return (
    <section>
      <div className={styles.logistics__main}>
        <ShipmentsClient />
      </div>
    </section>
  );
};

export default Logistics;
