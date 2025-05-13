'use client';

import { useMaterialGroups } from '@/api/hooks/useMaterialGroups';
import Loader from '../loader/loader';

export default function MaterialGroupsClient() {
  const { materialGroups, loading, error } = useMaterialGroups();

  if (loading) return <Loader />;
  if (error) return <div>Error loading material groups: {String(error)}</div>;

  return (
    <div>
      <h1>Material Groups</h1>
      {materialGroups.length === 0 ? (
        <p>No material group found</p>
      ) : (
        <ul>
          {materialGroups.map((group) => (
            <li key={group.id}>{group.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
