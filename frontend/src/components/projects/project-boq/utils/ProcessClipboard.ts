import * as XLSX from 'xlsx';
import { processFile, ProcessedFileData } from './ProcessFile';

type Props = {
    setProcessingClipboard: (boolean: boolean) => void
    setImportError: (error: string | null) => void
    setSelectedData: (result: ProcessedFileData | null) => void
}
export const processClipboard = async ({ setProcessingClipboard, setImportError, setSelectedData }: Props) => {

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
        // split lines and try TSV/CSV
        const rows = text
            .split(/\r?\n/)
            .filter((r) => r.trim() !== '')
            .map((r) => (r.indexOf('\t') >= 0 ? r.split('\t') : r.split(',')));
        const sheet = XLSX.utils.aoa_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, sheet, 'Sheet1');
        const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([arrayBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        processBlobAsFile(blob, 'clipboard.xlsx');
    };

    const handleHtmlFallback = (html: string) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const table = doc.querySelector('table');
            if (!table) {
                handlePlainTextFallback(html);
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
        } catch {
            handleError('Failed to parse HTML from clipboard');
        }
    };

    try {
        const nav = navigator as Navigator;
        if (nav.clipboard && typeof nav.clipboard.read === 'function') {
            const clipboardItems: ClipboardItem[] = await nav.clipboard.read();
            for (const item of clipboardItems) {
                const fileTypes = item.types || [];
                const excelType = fileTypes.find((t: string) =>
                    /excel|spreadsheet|sheet|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/i.test(
                        t
                    )
                );
                if (excelType) {
                    const blob: Blob = await item.getType(excelType);
                    processBlobAsFile(blob, 'clipboard.xlsx');
                    return;
                }

                // HTML table
                if (fileTypes.includes('text/html')) {
                    const blob: Blob = await item.getType('text/html');
                    const html = await blob.text();
                    handleHtmlFallback(html);
                    return;
                }

                // Plain text (TSV/CSV)
                if (fileTypes.includes('text/plain')) {
                    const blob: Blob = await item.getType('text/plain');
                    const text = await blob.text();
                    handlePlainTextFallback(text);
                    return;
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

        handleError('Clipboard does not contain Excel data or permission denied');
    } catch {
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
        } catch {
            handleError(
                'Cannot access clipboard (permission denied or unsupported)'
            );
        }
    }
};
