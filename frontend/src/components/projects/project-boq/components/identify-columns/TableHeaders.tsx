import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

type PropsTableHeaders = {
  colNumber: number;
};

interface DroppableProps {
  children: ReactNode;
  id: string | number;
  disabled?: boolean;
}

function Droppable(props: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.id,
    disabled: props.disabled,
  });

  const dropIndicator = isOver ? 'ring-2 ring-[var(--primary-500)]' : '';

  return (
    <th
      key={props.id}
      ref={setNodeRef}
      className={`sticky top-0 border border-[var(--border)] bg-[var(--primary-50)] px-4 py-3 text-sm font-semibold text-[var(--primary-700)] transition-all ${dropIndicator} ${props.id === 1 ? 'left-0 z-20' : 'z-10'}`}
    >
      {props.children}
    </th>
  );
}

const TableHeaders = ({ colNumber }: PropsTableHeaders) => {
  return (
    <tr>
      {Array.from({ length: colNumber + 1 }, (_, i) => i + 1).map((colNo) => (
        <Droppable id={colNo} key={colNo} disabled={colNo === 1}>
          {colNo === 1 ? '#' : 'unidentified'}
        </Droppable>
      ))}
    </tr>
  );
};

export default TableHeaders;
