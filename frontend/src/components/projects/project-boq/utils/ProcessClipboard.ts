import * as XLSX from 'xlsx';
import { processFile, ProcessedFileData } from './ProcessFile';

type Props = {
    handleData: (data: ProcessedFileData) => void
    setProcessingClipboard: (boolean: boolean) => void
    setImportError: (error: string | null) => void
    setSelectedData: (result: ProcessedFileData | null) => void
}
export const processClipboard = async ({ handleData, setProcessingClipboard, setImportError, setSelectedData }: Props) => {

    const handleError = (msg: string) => {
        setProcessingClipboard(false);
        setImportError(msg);
        setSelectedData(null);
    };

    const processBlobAsFile = (blob: Blob, name = 'clipboard.xlsx') => {
        const file = new File([blob], name, {
            type:
                blob.type ||
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        processFile(
            file,
            (processedData) => {
                handleData(processedData)
                setProcessingClipboard(false);
                setSelectedData(processedData);
                setImportError(null);
            },
            (error) => {
                setProcessingClipboard(false);
                setImportError(error);
                setSelectedData(null);
            }
        );
    };

    const handlePlainTextFallback = (text: string) => {
        try {
            // split lines and try TSV/CSV
            const rows = text
                .split(/\r?\n/)
                .filter((r) => r.trim() !== '')
                .map((r) => (r.indexOf('\t') >= 0 ? r.split('\t') : r.split(',')));
            
            if (rows.length === 0) {
                handleError('No data found in clipboard');
                return;
            }

            const sheet = XLSX.utils.aoa_to_sheet(rows);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, sheet, 'Sheet1');
            const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([arrayBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            processBlobAsFile(blob, 'clipboard.xlsx');
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            handleError(`Failed to parse clipboard text: ${message}`);
        }
    };

    const handleHtmlFallback = (html: string) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const table = doc.querySelector('table');
            if (!table) {
                // Try plain text if no table found
                const plainText = doc.body?.textContent || html;
                if (plainText.trim()) {
                    handlePlainTextFallback(plainText);
                } else {
                    handleError('No table found in HTML clipboard data');
                }
                return;
            }
            const sheet = XLSX.utils.table_to_sheet(table as HTMLTableElement);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, sheet, 'Sheet1');
            const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([arrayBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            processBlobAsFile(blob, 'clipboard_table.xlsx');
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            handleError(`Failed to parse HTML from clipboard: ${message}`);
        }
    };

    try {
        const nav = navigator as Navigator;
        if (nav.clipboard && typeof nav.clipboard.read === 'function') {
            const clipboardItems: ClipboardItem[] = await nav.clipboard.read();
            
            if (clipboardItems.length === 0) {
                handleError('Clipboard is empty');
                return;
            }

            for (const item of clipboardItems) {
                const fileTypes = item.types || [];

                const excelType = fileTypes.find((t: string) =>
                    /excel|spreadsheet|sheet|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/i.test(
                        t
                    )
                );
                if (excelType) {
                    const blob: Blob = await item.getType(excelType);
                    if (blob.size === 0) {
                        console.log('Excel blob is empty, trying other types');
                        continue;
                    }
                    processBlobAsFile(blob, 'clipboard.xlsx');
                    return;
                }

                // HTML table
                if (fileTypes.includes('text/html')) {
                    const blob: Blob = await item.getType('text/html');
                    const html = await blob.text();
                    if (html && html.trim().length > 0) {
                        handleHtmlFallback(html);
                        return;
                    }
                }

                // Plain text (TSV/CSV)
                if (fileTypes.includes('text/plain')) {
                    const blob: Blob = await item.getType('text/plain');
                    const text = await blob.text();
                    if (text && text.trim().length > 0) {
                        handlePlainTextFallback(text);
                        return;
                    }
                }
            }
        }

        // Fallback to readText() if read() not available or nothing useful found
        if (nav.clipboard && typeof nav.clipboard.readText === 'function') {
            const text = await nav.clipboard.readText();
            if (text && text.trim().length > 0) {
                // try detect HTML table
                if (/<table[\s\S]*?>/.test(text)) {
                    handleHtmlFallback(text);
                    return;
                }
                // plain TSV/CSV
                handlePlainTextFallback(text);
                return;
            }
        }

        handleError('Clipboard does not contain valid data');
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('Clipboard error:', message);
        
        try {
            const text = await navigator.clipboard.readText();
            if (text && text.trim().length > 0) {
                if (/<table[\s\S]*?>/.test(text)) {
                    handleHtmlFallback(text);
                    return;
                }
                handlePlainTextFallback(text);
                return;
            }
            handleError('Cannot access clipboard or clipboard is empty');
        } catch (fallbackErr) {
            const fallbackMessage = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
            handleError(
                `Cannot access clipboard: ${fallbackMessage}`
            );
        }
    }
};
