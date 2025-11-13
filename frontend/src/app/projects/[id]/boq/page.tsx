import { BoqSections } from '@/features/projects/project-boq/BoqSections';

type Props = { params: Promise<{ id: string }> };

export default async function BoqPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <BoqSections projectId={Number(id)} />
    </section>
  );
}
