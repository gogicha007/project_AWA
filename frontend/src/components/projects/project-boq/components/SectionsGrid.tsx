import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, themeQuartz } from 'ag-grid-community';
import {ModuleRegistry, AllCommunityModule} from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

// Define interface for row data
interface SectionRow {
  sectionCode: string;
  sectionName: string;
  sectionType: string;
  totalAmount: number;
  location: string;
}

export const SectionsGrid = () => {
  const [rowData, setRowData] = useState<SectionRow[]>([
    {
      sectionCode: 'dw',
      sectionName: 'section name',
      sectionType: 'sanitation',
      totalAmount: 1000,
      location: 'vani',
    },
  ]);
  
  const [colDefs, setColDefs] = useState<ColDef<SectionRow>[]>([
    { field: 'sectionCode', headerName: 'Section Code' },
    { field: 'sectionName', headerName: 'Section Name' },
    { field: 'sectionType', headerName: 'Section Type' },
    { field: 'totalAmount', headerName: 'Total Amount', type: 'numericColumn' },
    { field: 'location', headerName: 'Location' },
  ]);
  
  return (
    <div style={{ height: 300, width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} theme={themeQuartz}/>
    </div>
  );
};