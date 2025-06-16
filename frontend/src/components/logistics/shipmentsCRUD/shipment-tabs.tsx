import { useState } from 'react';
import styles from './shipment-tabs.module.css';
import FileUploader from '@/components/controls/file-uploader/FileUploader';
import InvoiceTable from '@/components/purchases/invoices/invoice-table';
import FreightTable from '@/components/purchases/freights/freight-table';
import { FileData } from '@/components/controls/file-uploader/FileUploader';

interface ShipmentTabsProps {
  tS: (key: string) => string;
  tB: (key: string) => string;
  fileDataArray: FileData[];
  setFileDataArray: (files: FileData[]) => void;
  isEditMode: boolean;
  originalFiles: FileData[];
  setIsFilesChanged: (changed: boolean) => void;
}

export default function ShipmentTabs({
  tS,
  tB,
  fileDataArray,
  setFileDataArray,
  isEditMode,
  originalFiles,
  setIsFilesChanged
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
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className={styles.tabPanel}>
        {activeTab === 0 && (
          <FileUploader
            tS={tS}
            fileDataArray={fileDataArray}
            setFileDataArray={setFileDataArray}
            isEditMode={isEditMode}
            originalFiles={originalFiles}
            setIsFilesChanged={setIsFilesChanged}
          />
        )}
        {activeTab === 1 && <InvoiceTable tB={tB} />}
        {activeTab === 2 && <FreightTable />}
      </div>
    </div>
  );
}