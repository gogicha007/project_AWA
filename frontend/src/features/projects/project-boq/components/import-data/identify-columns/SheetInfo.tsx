import React from 'react';

type PropsSheetInfo = {
  sheetName: string;
  rowsLength: number;
  rowMaxWidth: number;
};
const SheetInfo = ({ sheetName, rowsLength, rowMaxWidth }: PropsSheetInfo) => {
  return (
    <div className="flex gap-6 rounded-lg bg-[var(--background-card)] p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-medium text-[var(--foreground-secondary)]">
          Sheet Name:
        </span>
        <span className="font-semibold text-[var(--primary-600)]">
          {sheetName}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-[var(--foreground-secondary)]">
          Row quantity:
        </span>
        <span className="font-semibold text-[var(--foreground)]">
          {rowsLength}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-[var(--foreground-secondary)]">
          Max width:
        </span>
        <span className="font-semibold text-[var(--foreground)]">
          {rowMaxWidth}
        </span>
      </div>
    </div>
  );
};

export default SheetInfo;
