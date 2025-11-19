'use client';

import AddButton from '@/components/controls/add-button/AddButton';
import { useTranslations } from 'next-intl';
import { LocationsCard } from './locations-card/LocationsCard';
import LocationForm from './locations-crud/location-form';
import { useState } from 'react';

const locations = [
  {
    id: 1,
    locationName: 'Location 1',
    progress: 75,
  },
  {
    id: 2,
    locationName: 'Location 2',
    progress: 50,
  },
  {
    id: 3,
    locationName: 'Location 3',
    progress: 25,
  },
  {
    id: 4,
    locationName: 'Location 4',
    progress: 15,
  },
];

export const ProjectLocations = ({ id }: { id: number }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const tPjLoc = useTranslations('ProjectLocations');

  const onAdd = () => setIsDialogOpen(true);
  const onClose = () => setIsDialogOpen(false);
  const onSave = () => setIsDialogOpen(false);

  return (
    <div className="max-w-1400px flex flex-col gap-4 p-24">
      <div className="flex items-center justify-between">
        <h2>
          {tPjLoc('title')} {id}
        </h2>
        <AddButton
          label={tPjLoc('actions.create')}
          onAdd={onAdd}
        />
      </div>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <LocationsCard key={loc.id} data={loc} tVar={tPjLoc} />
        ))}
      </div>
      <LocationForm
        isOpen={isDialogOpen}
        locationId={null}
        onClose={onClose}
        onSave={onSave}
        tVar={tPjLoc}
      />
    </div>
  );
};
