import { useState } from 'react';
import styles from './shipment-tabs.module.css';
import FreightTable from '@/components/purchases/freights/freight-table';
import { FileData } from '@/components/controls/file-input/FileInput';
import { CurrencyDTO, VendorDTO, UnitDTO, MaterialNameDTO } from '@/api/types';
import FileInput from '@/components/controls/file-input/FileInput';
import InvoiceFields from './invoice-table-components/InvoiceFields';
import { SnackbarControls } from '../../../feedback/snackbar/snackbarTypes';

interface ShipmentTabsProps {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
    units: UnitDTO[];
    materials: MaterialNameDTO[];
  };
  disabled: boolean; // disable tabs
  fileDataArray: FileData[];
  setFileDataArray: (files: FileData[]) => void;
  snackbarControls?: SnackbarControls;
  tS: (key: string) => string;
  tB: (key: string) => string;
}

export default function ShipmentTabs({
  auxData,
  disabled,
  fileDataArray,
  setFileDataArray,
  snackbarControls,
  tS,
}: ShipmentTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Files', 'Invoices', 'Freights'];

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === index ? styles.tabActive : ''}`}
            disabled={disabled}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.tabPanel}>
        {activeTab === 0 && (
          <FileInput
            disabled={disabled}
            fileDataArray={fileDataArray}
            setFileDataArray={setFileDataArray}
            tS={tS}
          />
        )}
        {activeTab === 1 && (
          <InvoiceFields
            auxData={auxData}
            snackbarControls={snackbarControls}
          />
        )}
        {activeTab === 2 && <FreightTable />}
      </div>
    </div>
  );
}
