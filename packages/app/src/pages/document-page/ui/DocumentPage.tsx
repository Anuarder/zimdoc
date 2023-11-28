import { useParams } from 'react-router-dom';
import { UiBaseLayout } from '~shared/ui';

export function DocumentPage() {
  const { id } = useParams();

  return (
    <UiBaseLayout>
      <section className="h-full w-full overflow-auto bg-white">
        <div className="px-6 pt-20">DOCUMENT PAGE {id}</div>
      </section>
    </UiBaseLayout>
  );
}
