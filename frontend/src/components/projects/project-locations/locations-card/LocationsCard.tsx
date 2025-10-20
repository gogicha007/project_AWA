import React from 'react';

interface LocationsCardProps {
  data?: { id: number; locationName: string; progress: number };
  tVar: (key: string) => string;
}

export const LocationsCard: React.FC<LocationsCardProps> = ({ data, tVar }) => {
  const progressColors = {
    poor: 'var(--danger-500)',
    fair: 'var(--warning-500)',
    good: 'var(--primary-600)',
    excellent: 'var(--success-500)',
  };

  const inRange = (value: number, min: number, max: number) => {
    return value >= min && value <= max;
  };

  const getProgressColor = (progress: number) => {
    if (inRange(progress, 0, 24)) return progressColors.poor;
    if (inRange(progress, 25, 49)) return progressColors.fair;
    if (inRange(progress, 50, 74)) return progressColors.good;
    return progressColors.excellent;
  };

  return (
    <div
      className="flex h-full flex-col gap-4 rounded-xl border shadow-sm transition-all duration-200 ease-in-out"
      style={{
        backgroundColor: 'var(--background-card, #ffffff)',
        borderColor: 'var(--border, #e2e8f0)',
        padding: '1.5rem',
      }}
    >
      <h3>{data?.locationName || 'Unknown Location'}</h3>

      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full transition-all duration-300`}
          style={{
            width: `${data?.progress || 75}%`,
            backgroundColor: getProgressColor(data?.progress || 75),
          }}
        ></div>
      </div>
      <div className="flex justify-between text-sm">
        <p>{tVar('card.progress_title')}</p>
        <p>{data?.progress || 75}%</p>
      </div>
    </div>
  );
};
