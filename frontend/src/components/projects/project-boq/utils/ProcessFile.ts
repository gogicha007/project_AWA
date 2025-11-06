import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

export type ProcessedFileData = {
  data: Papa.ParseResult<string[]> | XLSX.WorkBook;
  type: 'csv' | 'xlsx';
  file: File;
};

export const processFile = (
  file: File,
  onComplete: (result: ProcessedFileData) => void,
  onError: (error: string) => void
) => {
  const MAX_SIZE_BYTES = 10 * 1024 * 1024;

  if (!file) return;

  if (file.size > MAX_SIZE_BYTES) {
    onError('File is too large. File size must be under 10 MB.');
    return;
  }

  if (file.name.slice(-4).toLowerCase() === '.csv') {
    const reader = new FileReader();

    reader.onerror = () => {
      onError('Failed to read CSV file.');
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
          complete: (results) => onComplete({ data: results, type: 'csv', file }),
          error: (err: Papa.ParseError) => {
            onError(`Invalid CSV file or parse error: ${err.message} || 'Unknown error.'`);
          },
        };

        Papa.parse(text, cfg as unknown as Papa.ParseConfig<string[]>);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        onError(`Invalid CSV file format: ${message || 'Unknown error.'}`);
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
        console.log(data)
        const workbook = XLSX.read(data, { type: 'array' });
        if (!workbook.SheetNames.length) {
          onError('Invalid Excel file: No sheets found.');
          return;
        }
        if (onComplete) {
          onComplete({ data: workbook, type: 'xlsx', file });
        }
      } catch {
        onError('Invalid Excel file format');
      }
    };
    reader.readAsArrayBuffer(file);
  }
};
