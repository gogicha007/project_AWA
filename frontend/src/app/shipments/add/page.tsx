import styles from '../page.module.css';
import React from 'react';
// import AddShipmentForm from '@/components/logistics/shipmentsCRUD/shipment-form';
import { ShipmentFormSet } from '@/features/logistics/shipmentsCRUD/ShipmentForm';

const AddShipment = () => {
  return (
    <section>
      <div className={styles.logistics__main}>
        <ShipmentFormSet />
      </div>
    </section>
  );
};

export default AddShipment;
