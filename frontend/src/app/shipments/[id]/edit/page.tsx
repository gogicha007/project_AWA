'use client';

import styles from '../../page.module.css';
import React from 'react';
import { useParams } from 'next/navigation';
import { ShipmentFormSet } from '@/components/logistics/shipmentsCRUD/ShipmentForm';

const EditShipment = () => {
  const params = useParams();
  const shipmentId = params.id as string;

  return (
    <section>
      <div className={styles.logistics__main}>
        <ShipmentFormSet id={+shipmentId}/>
      </div>
    </section>
  );
};

export default EditShipment;
