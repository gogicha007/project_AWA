import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

export type ProcessedFileData = {
  data: Papa.ParseResult<string[]> | XLSX.WorkBook;
  type: 'csv' | 'xlsx';
  file: File;
};

export const processFile = (
  file: File,
  onComplete?: (result: ProcessedFileData) => void
) => {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024;

  if (!file) return;

  if (file.size > MAX_SIZE_BYTES) {
    alert('File is too large. Please upload files smaller than 10 MB.');
    return;
  }

  if (file.name.slice(-4).toLowerCase() === '.csv') {
    const reader = new FileReader();

    reader.onerror = () => {
      console.error('FileReader error while reading CSV');
      alert('Failed to read CSV file.');
      reader.abort();
    };

    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        type LocalParseCfg = {
          skipEmptyLines?: boolean;
          complete?: (results: Papa.ParseResult<string[]>) => void;
          error?: (err: Papa.ParseError) => void;
        };

        const cfg: LocalParseCfg = {
          skipEmptyLines: true,
          complete: (results) => {
            if (onComplete) {
              onComplete({ data: results, type: 'csv', file });
            }
          },
          error: (err: Papa.ParseError) => {
            console.error('CSV parse error:', err);
            alert('Invalid CSV file or parse error.');
          },
        };

        Papa.parse(text, cfg as unknown as Papa.ParseConfig<string[]>);
      } catch (err) {
        console.error('CSV parsing failed:', err);
        alert('Invalid CSV file format.');
      }
    };

    reader.readAsText(file);
  }

  if (
    file.name.slice(-5).toString() === '.xlsx' ||
    file.name.slice(-4).toString() === '.xls'
  ) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      try {
        const workbook = XLSX.read(data, { type: 'array' });
        if (!workbook.SheetNames.length) {
          alert('Invalid Excel file: No sheets found.');
          return;
        }
        if (onComplete) {
          onComplete({ data: workbook, type: 'xlsx', file });
        }
      } catch {
        alert('Invalid Excel file format');
      }
    };
    reader.readAsArrayBuffer(file);
    console.log('this is excel file');
  }
};
