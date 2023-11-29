import { DocumentType } from '~/entities/document';
import { ChangeEvent } from 'react';

export function Document({
  document,
  onChange,
}: {
  document: DocumentType;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <>
      <h1 className="text-center text-lg font-semibold text-gray-700">
        {document.title} <br />
        <small className="text-xs">id: {document.id}</small>
      </h1>
      <textarea
        value={document.content}
        className="mt-4 w-full flex-1 resize-none appearance-none border-none focus:ring-0"
        placeholder="Введите текст"
        onChange={e => onChange(e)}
      />
    </>
  );
}
