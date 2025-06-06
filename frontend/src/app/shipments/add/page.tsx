import styles from '../page.module.css';
import React from 'react';
import AddShipmentForm from '@/components/logistics/shipmentsCRUD/shipment-form';

const AddShipment = () => {
  return (
    <section>
      <div className={styles.logistics__main}>
        <AddShipmentForm />
      </div>
    </section>
  );
};

export default AddShipment;
