import { isEmpty } from 'lodash-es';
import { DocumentType } from '~/entities/document';

import { UiBaseLayout } from '~shared/ui';
import { EmptyDocs } from '../components/EmptyDocs.tsx';
import { DocsTable } from '../components/DocsTable.tsx';
import { DocsShimmer } from '../components/DocsShimmer.tsx';
import { useMainPageModel } from '../model';

function DocsContent({
  isPending,
  docs,
}: {
  isPending: boolean;
  docs?: Array<DocumentType>;
}) {
  if (isPending) {
    return <DocsShimmer />;
  }

  if (docs && !isEmpty(docs)) {
    return <DocsTable docs={docs} />;
  }

  return <EmptyDocs className="mt-20" />;
}

export function MainPage() {
  const {
    isGetDocumentsPending,
    isCreateDocumentPending,
    documents,
    createDocument,
    errorMessage,
  } = useMainPageModel();

  return (
    <UiBaseLayout>
      <section className="flex h-full w-full flex-col overflow-auto bg-white">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative">
            <button
              type="button"
              disabled={isCreateDocumentPending}
              className="mt-20 flex w-56 items-center rounded bg-zim-secondary px-4 py-2 font-semibold text-white outline-none duration-200 hover:opacity-95 focus:ring-1 active:scale-[.99]"
              onClick={() => createDocument()}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M256 112v288m144-144H112"
                />
              </svg>
              {isCreateDocumentPending ? 'Загрузка...' : 'Создать документ'}
            </button>
            {errorMessage && (
              <p className="absolute mt-2 text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
          <div className="mt-2 pb-6">
            <DocsContent isPending={isGetDocumentsPending} docs={documents} />
          </div>
        </div>
      </section>
    </UiBaseLayout>
  );
}
