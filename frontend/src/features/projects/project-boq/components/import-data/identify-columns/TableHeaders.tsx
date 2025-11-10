import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

type PropsTableHeaders = {
  colNumber: number;
  columnMapping: Record<number, string>;
  tVar: (key: string) => string;
  onRemoveMapping: (columnNumber: number) => void;
};

interface DroppableProps {
  children: ReactNode;
  id: string | number;
  disabled?: boolean;
  isMapped?: boolean;
  onRemove?: () => void;
}

function Droppable(props: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.id,
    disabled: props.disabled,
  });

  const dropIndicator = isOver ? 'ring-2 ring-[var(--primary-500)]' : '';
  const mappedStyles = props.isMapped
    ? 'bg-[var(--secondary-100)] text-[var(--secondary-700)] hover:bg-[var(--secondary-200)]'
    : '';

  return (
    <th
      key={props.id}
      ref={setNodeRef}
      className={`sticky top-0 border border-[var(--border)] bg-[var(--primary-50)] px-4 py-3 text-sm font-semibold text-[var(--primary-700)] transition-all ${dropIndicator} ${mappedStyles} ${props.id === 1 ? 'left-0 z-20' : 'z-10'}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{props.children}</span>
        {props.isMapped && (
          <button
            onClick={props.onRemove}
            className="rounded-full p-1 text-[var(--danger-600)] hover:bg-[var(--danger-100)] transition-colors"
            title="Remove mapping"
          >
            ×
          </button>
        )}
      </div>
    </th>
  );
}

const TableHeaders = ({
  colNumber,
  columnMapping,
  tVar,
  onRemoveMapping,
}: PropsTableHeaders) => {
  return (
    <tr>
      {Array.from({ length: colNumber + 1 }, (_, i) => i + 1).map((colNo) => {
        const fieldName = columnMapping[colNo];
        const displayText = fieldName
          ? tVar(`sections.field.${fieldName}`)
          : 'unidentified';
        const isMapped = !!fieldName;

        return (
          <Droppable
            id={colNo}
            key={colNo}
            disabled={colNo === 1}
            isMapped={isMapped}
            onRemove={() => onRemoveMapping(colNo)}
          >
            {colNo === 1 ? '#' : displayText}
          </Droppable>
        );
      })}
    </tr>
  );
};

export default TableHeaders;
