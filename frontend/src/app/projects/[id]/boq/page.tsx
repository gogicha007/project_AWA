import { BoqSectionDTO } from '@/features/projects/api/boqSectionsApi';
import { BoqSections } from '@/features/projects/project-boq/BoqSections';
import { sectionsApi } from '@/features/projects/api/boqSectionsApi';

type Props = { params: Promise<{ id: string }> };

export default async function BoqPage({ params }: Props) {
  const { id } = await params;
  let data = [] as BoqSectionDTO[];

  try {
    const res = await sectionsApi.getAll();
    data = res
  } catch (error) {
    throw error;
  }

  return (
    <section>
      <BoqSections projectId={Number(id)} initialData={data} />
    </section>
  );
}
