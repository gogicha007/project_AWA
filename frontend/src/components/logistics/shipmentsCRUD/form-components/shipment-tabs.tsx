import { useState } from 'react';
import styles from './shipment-tabs.module.css';
// import FileUploader from '@/components/controls/file-uploader/FileUploader';
// import InvoiceTable from '@/components/purchases/invoices/invoice-table';
import FreightTable from '@/components/purchases/freights/freight-table';
// import { FileData } from '@/components/controls/file-uploader/FileUploader';
import { FileData } from '@/components/controls/file-input/FileInput';
import { CurrencyDTO, InvoiceDTO, VendorDTO } from '@/api/types';
import FileInput from '@/components/controls/file-input/FileInput';
import InvoiceFields from './invoice/InvoiceFields';

interface ShipmentTabsProps {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  disabled: boolean;
  invoiceArray: InvoiceDTO[];
  fileDataArray: FileData[];
  setInvoiceArray: (invoices: InvoiceDTO[]) => void;
  setFileDataArray: (files: FileData[]) => void;
  tS: (key: string) => string;
  tB: (key: string) => string;
}

export default function ShipmentTabs({
  auxData,
  disabled,
  fileDataArray,
  setFileDataArray,
  tS,
  tB,
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
            tB={tB}
            tS={tS}
          />
        )}
        {activeTab === 2 && <FreightTable />}
      </div>
    </div>
  );
}
