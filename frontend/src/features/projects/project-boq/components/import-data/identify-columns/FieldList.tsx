import { useDraggable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { boqFields } from '../../../utils/boqConstants';

type PropsSectonList = {
  tVar: (key: string) => string;
  usedFields: string[];
};

interface DraggableProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

function Draggable({ id, children, disabled }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      disabled: disabled,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : undefined;

  const draggingStyles = isDragging
    ? 'opacity-50 cursor-grabbing'
    : disabled
      ? 'cursor-not-allowed opacity-40'
      : 'cursor-grab';

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded bg-[var(--primary-50)] px-3 py-2 text-sm font-medium text-[var(--primary-700)] transition-colors hover:bg-[var(--primary-100)] ${draggingStyles}`}
    >
      {children}
    </li>
  );
}

const FieldList = ({ tVar, usedFields }: PropsSectonList) => {
  const path = usePathname()
  const fieldsList = path.includes('items') ? boqFields.items : boqFields.sections

  return (
    <div className="flex min-w-30 flex-col gap-3 rounded-lg bg-[var(--background-card)] p-4 shadow-sm">
      <p className="text-lg font-semibold text-[var(--primary-600)]">
        {tVar(`sections.title`)}
      </p>
      <ul className="flex flex-col gap-2">
        {fieldsList.map((field) => {
          const isUsed = usedFields.includes(field);
          return (
            <Draggable key={field} id={field} disabled={isUsed}>
              {tVar(`sections.field.${field}`)}
            </Draggable>
          );
        })}
      </ul>
    </div>
  );
};

export default FieldList;
